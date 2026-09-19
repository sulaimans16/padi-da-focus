import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { verifyWebhook, EventName, type PaddleEnv } from "@/lib/paddle.server";

let _supabase: ReturnType<typeof createClient<any>> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<any>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    );
  }
  return _supabase;
}

const PLANS: Record<string, { plan: string; amountInr: number; months: number }> = {
  padida_pro_quarterly: { plan: "quarterly", amountInr: 50, months: 3 },
  padida_pro_yearly: { plan: "yearly", amountInr: 100, months: 12 },
};

function periodEnd(from: Date, months: number) {
  const end = new Date(from);
  end.setMonth(end.getMonth() + months);
  return end.toISOString();
}

async function handleTransactionCompleted(data: any, env: PaddleEnv) {
  const userId = data.customData?.userId;
  if (!userId) {
    console.error("payments-webhook: no userId in customData");
    return;
  }

  const priceId = data.items?.[0]?.price?.importMeta?.externalId;
  if (!priceId) {
    console.warn("payments-webhook: missing importMeta.externalId", {
      rawPriceId: data.items?.[0]?.price?.id,
    });
    return;
  }

  const plan = PLANS[priceId];
  if (!plan) {
    console.warn("payments-webhook: unknown price", priceId);
    return;
  }

  const supabase = getSupabase();

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("paddle_transaction_id", data.id)
    .limit(1);
  if (existing && existing.length > 0) return;

  // Extend an already-active plan instead of overwriting it.
  const { data: active } = await supabase
    .from("subscriptions")
    .select("current_period_end")
    .eq("user_id", userId)
    .eq("environment", env)
    .eq("status", "active")
    .gt("current_period_end", new Date().toISOString())
    .order("current_period_end", { ascending: false })
    .limit(1);

  const startFrom =
    active && active.length > 0
      ? new Date(active[0]!["current_period_end"] as string)
      : new Date();

  const { error } = await supabase.from("subscriptions").insert({
    user_id: userId,
    plan: plan.plan,
    status: "active",
    amount_inr: plan.amountInr,
    current_period_end: periodEnd(startFrom, plan.months),
    price_id: priceId,
    paddle_transaction_id: data.id,
    paddle_customer_id: data.customerId ?? null,
    environment: env,
    note: "Paid via checkout",
  });
  if (error) console.error("payments-webhook: insert failed", error);
}

async function handleWebhook(req: Request, env: PaddleEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.eventType) {
    case EventName.TransactionCompleted:
      await handleTransactionCompleted(event.data as any, env);
      break;
    default:
      console.log("payments-webhook: unhandled event", event.eventType);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;
        try {
          await handleWebhook(request, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("payments-webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
