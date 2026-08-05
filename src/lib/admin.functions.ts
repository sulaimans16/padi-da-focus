import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PLANS = {
  quarterly: { months: 3, amount: 50 },
  yearly: { months: 12, amount: 100 },
} as const;

const GrantInput = z.object({
  email: z.string().email(),
  plan: z.enum(["quarterly", "yearly"]),
  note: z.string().max(200).optional(),
});

const RevokeInput = z.object({ subscriptionId: z.string().uuid() });

async function requireAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Admins only.");
}

export const listMembers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const { data: subs } = await supabaseAdmin
      .from("subscriptions")
      .select("id, user_id, plan, status, amount_inr, current_period_end, created_at")
      .order("created_at", { ascending: false });
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role");
    const { data: profiles } = await supabaseAdmin.from("profiles").select("id, display_name");

    const nameById = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));
    const now = Date.now();

    return {
      members: (users?.users ?? []).map((u) => {
        const sub = (subs ?? []).find((s) => s.user_id === u.id) ?? null;
        const isAdmin = (roles ?? []).some((r) => r.user_id === u.id && r.role === "admin");
        const active =
          isAdmin ||
          Boolean(
            sub && sub.status === "active" && new Date(sub.current_period_end).getTime() > now,
          );
        return {
          id: u.id,
          email: u.email ?? "",
          name: nameById.get(u.id) ?? "",
          createdAt: u.created_at,
          isAdmin,
          isPro: active,
          subscription: sub,
        };
      }),
    };
  });

export const grantPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => GrantInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const target = (users?.users ?? []).find(
      (u) => (u.email ?? "").toLowerCase() === data.email.toLowerCase(),
    );
    if (!target) throw new Error(`No account found for ${data.email}.`);

    const plan = PLANS[data.plan];
    const end = new Date();
    end.setMonth(end.getMonth() + plan.months);

    const { error } = await supabaseAdmin.from("subscriptions").insert({
      user_id: target.id,
      plan: data.plan,
      status: "active",
      amount_inr: plan.amount,
      current_period_end: end.toISOString(),
      note: data.note ?? "activated by admin",
    });
    if (error) throw new Error(error.message);

    return { ok: true, until: end.toISOString() };
  });

export const revokePlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => RevokeInput.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update({ status: "cancelled" })
      .eq("id", data.subscriptionId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
