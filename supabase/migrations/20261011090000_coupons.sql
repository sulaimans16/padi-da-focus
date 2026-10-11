-- Promo coupons that grant temporary Pro access to signed-in users.
-- Access from a coupon lasts until the coupon's own expiry and ends immediately if the
-- coupon is deactivated, so a whole campaign can be switched off with one UPDATE.

CREATE TABLE public.coupons (
  code text PRIMARY KEY CHECK (code = upper(code)),
  description text NOT NULL DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  expires_at timestamptz NOT NULL,
  max_redemptions integer,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.coupons TO service_role;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage coupons" ON public.coupons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coupons TO authenticated;

CREATE TABLE public.coupon_redemptions (
  user_id uuid NOT NULL,
  code text NOT NULL REFERENCES public.coupons(code) ON DELETE CASCADE,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, code)
);
GRANT SELECT ON public.coupon_redemptions TO authenticated;
GRANT ALL ON public.coupon_redemptions TO service_role;
ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own redemptions" ON public.coupon_redemptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

INSERT INTO public.coupons (code, description, expires_at)
VALUES ('MINI_TRIP', 'Temporary Pro access for signed-in users', '2026-11-10 23:59:59+05:30')
ON CONFLICT (code) DO NOTHING;

-- Latest expiry among the user's live coupon redemptions, or NULL.
CREATE OR REPLACE FUNCTION public.coupon_access_until(_user_id uuid)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT max(c.expires_at)
  FROM public.coupon_redemptions r
  JOIN public.coupons c ON c.code = r.code
  WHERE r.user_id = _user_id AND c.active AND c.expires_at > now();
$$;

-- Caller-scoped wrapper for the app.
CREATE OR REPLACE FUNCTION public.my_coupon_access()
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.coupon_access_until(auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.redeem_coupon(_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _c public.coupons;
  _used integer;
BEGIN
  IF _uid IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Sign in to redeem a coupon.');
  END IF;
  SELECT * INTO _c FROM public.coupons WHERE code = upper(btrim(COALESCE(_code, '')));
  IF _c.code IS NULL OR NOT _c.active THEN
    RETURN jsonb_build_object('ok', false, 'error', 'That coupon code isn''t valid.');
  END IF;
  IF _c.expires_at <= now() THEN
    RETURN jsonb_build_object('ok', false, 'error', 'That coupon has expired.');
  END IF;
  IF EXISTS (SELECT 1 FROM public.coupon_redemptions WHERE user_id = _uid AND code = _c.code) THEN
    RETURN jsonb_build_object('ok', true, 'expires_at', _c.expires_at, 'already', true);
  END IF;
  IF _c.max_redemptions IS NOT NULL THEN
    PERFORM pg_advisory_xact_lock(hashtext('coupon:' || _c.code));
    SELECT count(*) INTO _used FROM public.coupon_redemptions WHERE code = _c.code;
    IF _used >= _c.max_redemptions THEN
      RETURN jsonb_build_object('ok', false, 'error', 'This coupon has been fully claimed.');
    END IF;
  END IF;
  INSERT INTO public.coupon_redemptions (user_id, code) VALUES (_uid, _c.code) ON CONFLICT DO NOTHING;
  RETURN jsonb_build_object('ok', true, 'expires_at', _c.expires_at, 'already', false);
END;
$$;

-- Coupon access counts as Pro everywhere is_pro() is used.
CREATE OR REPLACE FUNCTION public.is_pro(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin')
    OR public.has_active_subscription(_user_id)
    OR public.coupon_access_until(_user_id) IS NOT NULL
$$;

REVOKE EXECUTE ON FUNCTION public.coupon_access_until(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.coupon_access_until(uuid) TO service_role;
REVOKE EXECUTE ON FUNCTION public.my_coupon_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_coupon_access() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.redeem_coupon(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_coupon(text) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_pro(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_pro(uuid) TO service_role;
