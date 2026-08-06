import { useState } from "react";
import { initializePaddle, getPaddlePriceId } from "@/lib/paddle";

export function usePaddleCheckout() {
  const [loadingPrice, setLoadingPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openCheckout = async (options: {
    priceId: string;
    userId: string;
    customerEmail?: string | undefined;
    successUrl?: string | undefined;
  }) => {
    setLoadingPrice(options.priceId);
    setError(null);
    try {
      await initializePaddle();
      const paddlePriceId = await getPaddlePriceId(options.priceId);

      window.Paddle.Checkout.open({
        items: [{ priceId: paddlePriceId, quantity: 1 }],
        customer: options.customerEmail ? { email: options.customerEmail } : undefined,
        customData: { userId: options.userId },
        settings: {
          displayMode: "overlay",
          successUrl: options.successUrl ?? `${window.location.origin}/pricing?checkout=success`,
          allowLogout: false,
          variant: "one-page",
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open checkout.");
    } finally {
      setLoadingPrice(null);
    }
  };

  return { openCheckout, loadingPrice, error };
}
