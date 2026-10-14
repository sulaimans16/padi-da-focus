-- Ops: per-user Pro grants (referral rewards), referral tracking, onboarding flag and
-- an admin-only engagement report.

-- ---------- Pro grants ----------

CREATE TABLE IF NOT EXISTS public.pro_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  days integer NOT NULL CHECK (days > 0),
  until timestamptz NOT NULL,
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS pro_grants_user_idx ON public.pro_grants (user_id, until DESC);
GRANT SELECT ON public.pro_grants TO authenticated;
GRANT ALL ON public.pro_grants TO service_role;
ALTER TABLE public.pro_grants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own pro grants" ON public.pro_grants;
CREATE POLICY "Users read own pro grants" ON public.pro_grants FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Coupon access now also covers per-user grants, so my_coupon_access / is_pro (and the
-- app's useAccess) pick referral Pro up with no client change.
CREATE OR REPLACE FUNCTION public.coupon_access_until(_user_id uuid)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NULLIF(greatest(
    COALESCE((SELECT max(c.expires_at)
      FROM public.coupon_redemptions r
      JOIN public.coupons c ON c.code = r.code
      WHERE r.user_id = _user_id AND c.active AND c.expires_at > now()), '-infinity'::timestamptz),
    COALESCE((SELECT max(g.until) FROM public.pro_grants g
      WHERE g.user_id = _user_id AND g.until > now()), '-infinity'::timestamptz)
  ), '-infinity'::timestamptz);
$$;

-- Add days on top of whatever grant is still running.
CREATE OR REPLACE FUNCTION public.grant_pro_days(_uid uuid, _days integer, _source text)
RETURNS timestamptz
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _base timestamptz;
  _until timestamptz;
BEGIN
  SELECT greatest(now(), COALESCE(max(until), now())) INTO _base
    FROM public.pro_grants WHERE user_id = _uid;
  _until := _base + make_interval(days => _days);
  INSERT INTO public.pro_grants (user_id, days, until, source) VALUES (_uid, _days, _until, _source);
  RETURN _until;
END;
$$;

-- ---------- referrals ----------

CREATE TABLE IF NOT EXISTS public.referrals (
  referee uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  referrer uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  qualified_at timestamptz,
  rewarded_at timestamptz,
  referrer_days integer NOT NULL DEFAULT 0,
  CHECK (referee <> referrer)
);
CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON public.referrals (referrer, created_at DESC);
CREATE INDEX IF NOT EXISTS referrals_pending_idx ON public.referrals (referee) WHERE rewarded_at IS NULL;
GRANT SELECT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own referrals" ON public.referrals;
CREATE POLICY "Users read own referrals" ON public.referrals FOR SELECT TO authenticated
  USING (auth.uid() = referee OR auth.uid() = referrer);

-- Called after sign-in with the invite link's ?ref. Only new accounts (< 7 days) count,
-- once per learner. Returns 'recorded' | 'ignored'.
CREATE OR REPLACE FUNCTION public.record_referral(_username text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _ref uuid := public.social_user_by_name(_username);
  _joined timestamptz;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF _ref IS NULL OR _ref = _uid THEN RETURN 'ignored'; END IF;
  SELECT created_at INTO _joined FROM auth.users WHERE id = _uid;
  IF _joined IS NULL OR _joined < now() - interval '7 days' THEN RETURN 'ignored'; END IF;
  INSERT INTO public.referrals (referee, referrer) VALUES (_uid, _ref) ON CONFLICT (referee) DO NOTHING;
  RETURN CASE WHEN FOUND THEN 'recorded' ELSE 'ignored' END;
END;
$$;

-- Qualify on the referee's 10th answer: 7 Pro days each (referrer capped at 90 in total).
CREATE OR REPLACE FUNCTION public.referral_on_attempt()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _r public.referrals;
  _n integer;
  _earned integer;
  _give integer;
BEGIN
  SELECT * INTO _r FROM public.referrals WHERE referee = NEW.user_id AND rewarded_at IS NULL FOR UPDATE SKIP LOCKED;
  IF _r.referee IS NULL THEN RETURN NEW; END IF;
  SELECT count(*) INTO _n FROM public.attempts WHERE user_id = NEW.user_id;
  IF _n < 10 THEN RETURN NEW; END IF;
  SELECT COALESCE(sum(referrer_days), 0) INTO _earned FROM public.referrals WHERE referrer = _r.referrer;
  _give := greatest(0, least(7, 90 - _earned));
  PERFORM public.grant_pro_days(_r.referee, 7, 'referral_welcome');
  IF _give > 0 THEN PERFORM public.grant_pro_days(_r.referrer, _give, 'referral'); END IF;
  UPDATE public.referrals SET qualified_at = now(), rewarded_at = now(), referrer_days = _give
    WHERE referee = _r.referee;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS referral_on_attempt ON public.attempts;
CREATE TRIGGER referral_on_attempt AFTER INSERT ON public.attempts
  FOR EACH ROW EXECUTE FUNCTION public.referral_on_attempt();

CREATE OR REPLACE FUNCTION public.my_referrals()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'invited', count(*),
    'qualified', count(*) FILTER (WHERE r.rewarded_at IS NOT NULL),
    'days_earned', COALESCE(sum(r.referrer_days), 0),
    'pending', COALESCE(jsonb_agg(COALESCE(NULLIF(p.display_name, ''), p.username, 'Friend'))
      FILTER (WHERE r.rewarded_at IS NULL), '[]'::jsonb),
    'referred_by', (SELECT COALESCE(NULLIF(p2.display_name, ''), p2.username)
      FROM public.referrals r2 LEFT JOIN public.profiles p2 ON p2.id = r2.referrer
      WHERE r2.referee = auth.uid())
  )
  FROM public.referrals r
  LEFT JOIN public.profiles p ON p.id = r.referee
  WHERE r.referrer = auth.uid();
$$;

-- ---------- onboarding ----------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'onboarded_at') THEN
    ALTER TABLE public.profiles ADD COLUMN onboarded_at timestamptz;
    -- Everyone who already uses the app counts as onboarded; only new sign-ups see the wizard.
    UPDATE public.profiles SET onboarded_at = now();
  END IF;
END $$;

-- ---------- admin engagement report ----------

CREATE OR REPLACE FUNCTION public.admin_engagement(_days integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _from date;
  _today date := (now() AT TIME ZONE 'UTC')::date;
  _series jsonb;
  _totals jsonb;
  _ret jsonb;
  _ctx jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'admins only'; END IF;
  _days := least(greatest(COALESCE(_days, 30), 7), 180);
  _from := _today - (_days - 1);

  -- One row per (user, day, exam) of activity: answers or XP of any kind.
  CREATE TEMP TABLE IF NOT EXISTS _act (user_id uuid, day date, exam text) ON COMMIT DROP;
  TRUNCATE _act;
  INSERT INTO _act
    SELECT DISTINCT user_id, (created_at AT TIME ZONE 'UTC')::date, exam FROM public.attempts
      WHERE created_at >= (_from - 30)::timestamp AT TIME ZONE 'UTC'
    UNION
    SELECT DISTINCT user_id, (created_at AT TIME ZONE 'UTC')::date, exam FROM public.xp_events
      WHERE created_at >= (_from - 30)::timestamp AT TIME ZONE 'UTC';

  SELECT jsonb_agg(jsonb_build_object(
      'day', d.day,
      'active', (SELECT count(DISTINCT a.user_id) FROM _act a WHERE a.day = d.day),
      'active_pg', (SELECT count(DISTINCT a.user_id) FROM _act a WHERE a.day = d.day AND a.exam = 'neet_pg'),
      'active_ug', (SELECT count(DISTINCT a.user_id) FROM _act a WHERE a.day = d.day AND a.exam = 'neet_ug'),
      'signups', (SELECT count(*) FROM auth.users u WHERE (u.created_at AT TIME ZONE 'UTC')::date = d.day),
      'attempts', (SELECT count(*) FROM public.attempts t
        WHERE t.created_at >= d.day::timestamp AT TIME ZONE 'UTC'
          AND t.created_at < (d.day + 1)::timestamp AT TIME ZONE 'UTC')
    ) ORDER BY d.day)
  INTO _series
  FROM (SELECT generate_series(_from, _today, interval '1 day')::date AS day) d;

  SELECT jsonb_build_object(
    'users', (SELECT count(*) FROM auth.users),
    'dau', (SELECT count(DISTINCT user_id) FROM _act WHERE day = _today),
    'wau', (SELECT count(DISTINCT user_id) FROM _act WHERE day > _today - 7),
    'mau', (SELECT count(DISTINCT user_id) FROM _act WHERE day > _today - 30),
    'signups', (SELECT count(*) FROM auth.users WHERE created_at >= _from::timestamp AT TIME ZONE 'UTC'),
    'pro', (SELECT count(*) FROM auth.users u WHERE public.is_pro(u.id)),
    'referrals_invited', (SELECT count(*) FROM public.referrals WHERE created_at >= _from::timestamp AT TIME ZONE 'UTC'),
    'referrals_qualified', (SELECT count(*) FROM public.referrals WHERE rewarded_at >= _from::timestamp AT TIME ZONE 'UTC'),
    'onboarded', (SELECT count(*) FROM public.profiles p JOIN auth.users u ON u.id = p.id
      WHERE u.created_at >= _from::timestamp AT TIME ZONE 'UTC' AND p.onboarded_at IS NOT NULL)
  ) INTO _totals;

  -- Day-N retention for learners who signed up in the window (and are old enough to measure).
  WITH cohort AS (
    SELECT id, (created_at AT TIME ZONE 'UTC')::date AS d0 FROM auth.users
      WHERE created_at >= _from::timestamp AT TIME ZONE 'UTC'
  )
  SELECT jsonb_build_object(
    'd1', (SELECT round(100.0 * count(*) FILTER (WHERE EXISTS (SELECT 1 FROM _act a WHERE a.user_id = c.id AND a.day = c.d0 + 1))
            / NULLIF(count(*), 0)) FROM cohort c WHERE c.d0 + 1 < _today),
    'd7', (SELECT round(100.0 * count(*) FILTER (WHERE EXISTS (SELECT 1 FROM _act a WHERE a.user_id = c.id AND a.day BETWEEN c.d0 + 6 AND c.d0 + 8))
            / NULLIF(count(*), 0)) FROM cohort c WHERE c.d0 + 8 < _today),
    'd30', (SELECT round(100.0 * count(*) FILTER (WHERE EXISTS (SELECT 1 FROM _act a WHERE a.user_id = c.id AND a.day BETWEEN c.d0 + 28 AND c.d0 + 32))
            / NULLIF(count(*), 0)) FROM cohort c WHERE c.d0 + 32 < _today),
    'cohort', (SELECT count(*) FROM cohort)
  ) INTO _ret;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('context', context, 'attempts', n) ORDER BY n DESC), '[]'::jsonb)
  INTO _ctx FROM (
    SELECT context, count(*) AS n FROM public.attempts
      WHERE created_at >= _from::timestamp AT TIME ZONE 'UTC' GROUP BY context
  ) x;

  RETURN jsonb_build_object('days', _days, 'series', COALESCE(_series, '[]'::jsonb),
    'totals', _totals, 'retention', _ret, 'contexts', _ctx);
END;
$$;

-- ---------- grants ----------

REVOKE EXECUTE ON FUNCTION public.grant_pro_days(uuid, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.referral_on_attempt() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.record_referral(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.my_referrals() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_engagement(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_referral(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_engagement(integer) TO authenticated;