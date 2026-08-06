ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS paddle_transaction_id text,
  ADD COLUMN IF NOT EXISTS paddle_customer_id text,
  ADD COLUMN IF NOT EXISTS price_id text,
  ADD COLUMN IF NOT EXISTS environment text NOT NULL DEFAULT 'sandbox';

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_paddle_transaction_id_key
  ON public.subscriptions(paddle_transaction_id)
  WHERE paddle_transaction_id IS NOT NULL;

UPDATE public.subscriptions SET environment = 'live' WHERE paddle_transaction_id IS NULL;