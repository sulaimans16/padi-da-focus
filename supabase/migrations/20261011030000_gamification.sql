-- Gamification: XP, levels, streaks with freezes, daily quests, badges, mistake review and weekly leagues.
-- All game state is written server-side (triggers + SECURITY DEFINER RPCs) so XP and league
-- standings cannot be forged from the browser.

-- ---------- tables ----------

CREATE TABLE public.game_profiles (
  user_id uuid PRIMARY KEY,
  xp_total integer NOT NULL DEFAULT 0,
  daily_goal integer NOT NULL DEFAULT 50 CHECK (daily_goal IN (30, 50, 100, 200)),
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_streak_day date,
  streak_freezes integer NOT NULL DEFAULT 0 CHECK (streak_freezes BETWEEN 0 AND 2),
  current_combo integer NOT NULL DEFAULT 0,
  best_combo integer NOT NULL DEFAULT 0,
  combo_day date,
  best_combo_today integer NOT NULL DEFAULT 0,
  last_attempt_at timestamptz,
  league_tier integer NOT NULL DEFAULT 0 CHECK (league_tier BETWEEN 0 AND 6),
  league_opt_out boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.game_profiles TO authenticated;
GRANT ALL ON public.game_profiles TO service_role;
ALTER TABLE public.game_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own game profile" ON public.game_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_game_profiles_updated_at BEFORE UPDATE ON public.game_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.xp_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  source text NOT NULL,
  ref_id text NOT NULL DEFAULT '',
  day date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX xp_events_user_day_idx ON public.xp_events (user_id, day DESC);
CREATE INDEX xp_events_created_idx ON public.xp_events (created_at DESC, user_id);
-- One-off rewards can only be claimed once.
CREATE UNIQUE INDEX xp_events_once_idx ON public.xp_events (user_id, source, ref_id)
  WHERE source IN ('concept_done', 'daily_complete', 'quest_complete', 'quest_bonus');
GRANT SELECT ON public.xp_events TO authenticated;
GRANT ALL ON public.xp_events TO service_role;
ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own xp events" ON public.xp_events FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.user_badges (
  user_id uuid NOT NULL,
  badge_id text NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);
GRANT SELECT ON public.user_badges TO authenticated;
GRANT ALL ON public.user_badges TO service_role;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own badges" ON public.user_badges FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.mistake_queue (
  user_id uuid NOT NULL,
  question_id text NOT NULL,
  subject text NOT NULL DEFAULT '',
  stage integer NOT NULL DEFAULT 0,
  due_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, question_id)
);
CREATE INDEX mistake_queue_due_idx ON public.mistake_queue (user_id, due_at);
GRANT SELECT ON public.mistake_queue TO authenticated;
GRANT ALL ON public.mistake_queue TO service_role;
ALTER TABLE public.mistake_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own mistakes" ON public.mistake_queue FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.league_memberships (
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  tier integer NOT NULL,
  cohort integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, week_start)
);
CREATE INDEX league_memberships_cohort_idx ON public.league_memberships (week_start, tier, cohort);
GRANT SELECT ON public.league_memberships TO authenticated;
GRANT ALL ON public.league_memberships TO service_role;
ALTER TABLE public.league_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own league rows" ON public.league_memberships FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- ---------- internal helpers (not callable by clients) ----------

CREATE OR REPLACE FUNCTION public.game_ensure_profile(_uid uuid)
RETURNS public.game_profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.game_profiles;
BEGIN
  INSERT INTO public.game_profiles (user_id) VALUES (_uid) ON CONFLICT (user_id) DO NOTHING;
  SELECT * INTO _row FROM public.game_profiles WHERE user_id = _uid;
  RETURN _row;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_local_day(_uid uuid)
RETURNS date
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (now() AT TIME ZONE COALESCE((SELECT timezone FROM public.game_profiles WHERE user_id = _uid), 'Asia/Kolkata'))::date;
$$;

-- Consume freezes for missed days, or break the streak. Returns freezes used.
CREATE OR REPLACE FUNCTION public.game_settle_streak(_uid uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _p public.game_profiles;
  _today date;
  _missed integer;
BEGIN
  _p := public.game_ensure_profile(_uid);
  _today := public.game_local_day(_uid);
  IF _p.last_streak_day IS NULL OR _p.streak = 0 THEN
    RETURN 0;
  END IF;
  _missed := (_today - 1) - _p.last_streak_day;
  IF _missed <= 0 THEN
    RETURN 0;
  END IF;
  IF _missed <= _p.streak_freezes THEN
    UPDATE public.game_profiles
      SET streak_freezes = streak_freezes - _missed, last_streak_day = _today - 1
      WHERE user_id = _uid;
    RETURN _missed;
  END IF;
  UPDATE public.game_profiles SET streak = 0 WHERE user_id = _uid;
  RETURN 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_award_badge(_uid uuid, _badge text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.user_badges (user_id, badge_id) VALUES (_uid, _badge) ON CONFLICT DO NOTHING;
$$;

CREATE OR REPLACE FUNCTION public.game_check_badges(_uid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _p public.game_profiles;
  _correct integer;
  _pyq integer;
  _fixed integer;
  _concepts integer;
  _dailies integer;
  _focus integer;
  _long_focus boolean;
  _master boolean;
BEGIN
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid;
  SELECT count(*) FILTER (WHERE correct), count(*) FILTER (WHERE correct AND context = 'pyq')
    INTO _correct, _pyq FROM public.attempts WHERE user_id = _uid;
  SELECT count(*) FILTER (WHERE source = 'mistake_fixed'),
         count(*) FILTER (WHERE source = 'concept_done'),
         count(*) FILTER (WHERE source = 'daily_complete')
    INTO _fixed, _concepts, _dailies FROM public.xp_events WHERE user_id = _uid;
  SELECT count(*) FILTER (WHERE completed), bool_or(completed AND minutes >= 60)
    INTO _focus, _long_focus FROM public.focus_sessions WHERE user_id = _uid;
  SELECT EXISTS (
    SELECT 1 FROM public.attempts WHERE user_id = _uid
    GROUP BY subject HAVING count(*) >= 50 AND avg(CASE WHEN correct THEN 1 ELSE 0 END) >= 0.8
  ) INTO _master;

  IF _correct >= 1 THEN PERFORM public.game_award_badge(_uid, 'first_blood'); END IF;
  IF _correct >= 100 THEN PERFORM public.game_award_badge(_uid, 'century'); END IF;
  IF _correct >= 1000 THEN PERFORM public.game_award_badge(_uid, 'thousand'); END IF;
  IF _pyq >= 50 THEN PERFORM public.game_award_badge(_uid, 'pyq_hunter'); END IF;
  IF _fixed >= 25 THEN PERFORM public.game_award_badge(_uid, 'mistake_slayer'); END IF;
  IF _concepts >= 10 THEN PERFORM public.game_award_badge(_uid, 'scholar'); END IF;
  IF _dailies >= 7 THEN PERFORM public.game_award_badge(_uid, 'daily_devotee'); END IF;
  IF _focus >= 10 THEN PERFORM public.game_award_badge(_uid, 'focus_ten'); END IF;
  IF COALESCE(_long_focus, false) THEN PERFORM public.game_award_badge(_uid, 'iron_focus'); END IF;
  IF _master THEN PERFORM public.game_award_badge(_uid, 'subject_master'); END IF;
  IF _p.best_combo >= 10 THEN PERFORM public.game_award_badge(_uid, 'combo_10'); END IF;
  IF _p.best_combo >= 25 THEN PERFORM public.game_award_badge(_uid, 'combo_25'); END IF;
  IF _p.longest_streak >= 7 THEN PERFORM public.game_award_badge(_uid, 'streak_7'); END IF;
  IF _p.longest_streak >= 30 THEN PERFORM public.game_award_badge(_uid, 'streak_30'); END IF;
  IF _p.longest_streak >= 100 THEN PERFORM public.game_award_badge(_uid, 'streak_100'); END IF;
  IF _p.xp_total >= 5000 THEN PERFORM public.game_award_badge(_uid, 'xp_5000'); END IF;
END;
$$;

-- Records XP, then extends the streak if today's goal has just been reached.
CREATE OR REPLACE FUNCTION public.game_grant_xp(_uid uuid, _amount integer, _source text, _ref text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _p public.game_profiles;
  _today date;
  _today_xp integer;
  _inserted integer;
BEGIN
  IF _amount <= 0 THEN RETURN 0; END IF;
  PERFORM public.game_ensure_profile(_uid);
  _today := public.game_local_day(_uid);

  INSERT INTO public.xp_events (user_id, amount, source, ref_id, day)
  VALUES (_uid, _amount, _source, COALESCE(_ref, ''), _today)
  ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS _inserted = ROW_COUNT;
  IF _inserted = 0 THEN RETURN 0; END IF;

  UPDATE public.game_profiles SET xp_total = xp_total + _amount WHERE user_id = _uid;

  PERFORM public.game_settle_streak(_uid);
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid;
  IF _p.last_streak_day IS DISTINCT FROM _today THEN
    SELECT COALESCE(sum(amount), 0) INTO _today_xp FROM public.xp_events WHERE user_id = _uid AND day = _today;
    IF _today_xp >= _p.daily_goal THEN
      UPDATE public.game_profiles SET
        streak = CASE WHEN _p.last_streak_day = _today - 1 AND _p.streak > 0 THEN _p.streak + 1 ELSE 1 END,
        last_streak_day = _today
        WHERE user_id = _uid
        RETURNING * INTO _p;
      UPDATE public.game_profiles SET
        longest_streak = GREATEST(longest_streak, streak),
        streak_freezes = CASE WHEN streak % 7 = 0 THEN LEAST(2, streak_freezes + 1) ELSE streak_freezes END
        WHERE user_id = _uid;
    END IF;
  END IF;
  RETURN _amount;
END;
$$;

-- ---------- triggers ----------

CREATE OR REPLACE FUNCTION public.game_on_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _p public.game_profiles;
  _truth text;
  _correct boolean := NEW.correct;
  _repeat boolean;
  _burst integer;
  _combo integer;
  _today date;
  _amount integer;
  _queued public.mistake_queue;
BEGIN
  _p := public.game_ensure_profile(NEW.user_id);
  _today := public.game_local_day(NEW.user_id);

  -- Trust the bank, not the browser, whenever the question lives in the database.
  IF NEW.question_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    SELECT correct_option_id INTO _truth FROM public.questions WHERE id = NEW.question_id::uuid;
    IF _truth IS NOT NULL THEN _correct := (NEW.chosen_option_id = _truth); END IF;
  END IF;

  -- Anti-farming: no XP for re-answering the same question in the same mode within 10 minutes,
  -- or for machine-gun answering.
  SELECT EXISTS (
    SELECT 1 FROM public.attempts
    WHERE user_id = NEW.user_id AND question_id = NEW.question_id AND context = NEW.context
      AND id <> NEW.id AND created_at > now() - interval '10 minutes'
  ) INTO _repeat;
  SELECT count(*) INTO _burst FROM public.attempts
    WHERE user_id = NEW.user_id AND created_at > now() - interval '1 minute';

  -- Combo: consecutive correct answers, reset after 15 idle minutes. Repeats don't count.
  IF _repeat THEN
    _combo := _p.current_combo;
  ELSIF _correct THEN
    _combo := CASE WHEN _p.last_attempt_at > now() - interval '15 minutes' THEN _p.current_combo + 1 ELSE 1 END;
  ELSE
    _combo := 0;
  END IF;
  UPDATE public.game_profiles SET
    current_combo = _combo,
    best_combo = GREATEST(best_combo, _combo),
    best_combo_today = CASE WHEN combo_day = _today THEN GREATEST(best_combo_today, _combo) ELSE _combo END,
    combo_day = _today,
    last_attempt_at = now()
    WHERE user_id = NEW.user_id;

  IF NOT _repeat AND _burst <= 30 THEN
    _amount := CASE WHEN _correct THEN 10 + LEAST(10, 2 * GREATEST(0, _combo - 1)) ELSE 2 END;
    PERFORM public.game_grant_xp(NEW.user_id, _amount, 'answer', NEW.question_id);
  END IF;

  -- Mistake queue: light spaced repetition (now → 1d → 3d → 7d → mastered).
  SELECT * INTO _queued FROM public.mistake_queue WHERE user_id = NEW.user_id AND question_id = NEW.question_id;
  IF NOT _correct THEN
    INSERT INTO public.mistake_queue (user_id, question_id, subject, stage, due_at)
    VALUES (NEW.user_id, NEW.question_id, NEW.subject, 0, now())
    ON CONFLICT (user_id, question_id) DO UPDATE SET stage = 0, due_at = now();
  ELSIF _queued.question_id IS NOT NULL AND _queued.due_at <= now() THEN
    IF _queued.stage >= 3 THEN
      DELETE FROM public.mistake_queue WHERE user_id = NEW.user_id AND question_id = NEW.question_id;
    ELSE
      UPDATE public.mistake_queue SET
        stage = _queued.stage + 1,
        due_at = now() + (CASE _queued.stage WHEN 0 THEN interval '1 day' WHEN 1 THEN interval '3 days' ELSE interval '7 days' END)
        WHERE user_id = NEW.user_id AND question_id = NEW.question_id;
    END IF;
    PERFORM public.game_grant_xp(NEW.user_id, 15, 'mistake_fixed', NEW.question_id);
  END IF;

  PERFORM public.game_check_badges(NEW.user_id);
  RETURN NEW;
END;
$$;
CREATE TRIGGER game_on_attempt AFTER INSERT ON public.attempts
FOR EACH ROW EXECUTE FUNCTION public.game_on_attempt();

CREATE OR REPLACE FUNCTION public.game_on_focus_session()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _elapsed integer;
  _minutes integer;
BEGIN
  IF NOT NEW.completed THEN RETURN NEW; END IF;
  _elapsed := CEIL(EXTRACT(EPOCH FROM (now() - NEW.started_at)) / 60.0)::integer + 1;
  _minutes := LEAST(NEW.minutes, GREATEST(NEW.planned_minutes, 0), _elapsed, 60);
  PERFORM public.game_grant_xp(NEW.user_id, _minutes, 'focus', NEW.id::text);
  PERFORM public.game_check_badges(NEW.user_id);
  RETURN NEW;
END;
$$;
CREATE TRIGGER game_on_focus_session AFTER INSERT ON public.focus_sessions
FOR EACH ROW EXECUTE FUNCTION public.game_on_focus_session();

-- ---------- quests ----------

-- Catalogue: key, metric, target, reward.
CREATE OR REPLACE FUNCTION public.game_quest_catalogue()
RETURNS TABLE (quest_key text, metric text, target integer, reward integer, title text)
LANGUAGE sql
IMMUTABLE
AS $$
  VALUES
    ('answer_20', 'answers', 20, 20, 'Answer 20 questions'),
    ('answer_40', 'answers', 40, 35, 'Answer 40 questions'),
    ('correct_15', 'correct', 15, 25, 'Get 15 answers right'),
    ('combo_5', 'combo', 5, 20, 'Hit a 5-answer combo'),
    ('combo_10', 'combo', 10, 35, 'Hit a 10-answer combo'),
    ('fix_3', 'fixed', 3, 25, 'Fix 3 past mistakes'),
    ('focus_25', 'focus', 25, 25, 'Lock in for 25 focused minutes'),
    ('concept_1', 'concepts', 1, 15, 'Finish 1 Learn concept'),
    ('daily_done', 'daily', 1, 20, 'Complete the Daily Challenge'),
    ('xp_goal', 'goal', 1, 15, 'Hit your daily XP goal')
$$;

CREATE OR REPLACE FUNCTION public.game_quest_metric(_uid uuid, _metric text, _day date)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _tz text := COALESCE((SELECT timezone FROM public.game_profiles WHERE user_id = _uid), 'Asia/Kolkata');
  _p public.game_profiles;
  _v integer;
BEGIN
  IF _metric = 'answers' THEN
    SELECT count(*) INTO _v FROM public.attempts WHERE user_id = _uid AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'correct' THEN
    SELECT count(*) INTO _v FROM public.attempts WHERE user_id = _uid AND correct AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'combo' THEN
    SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid;
    _v := CASE WHEN _p.combo_day = _day THEN _p.best_combo_today ELSE 0 END;
  ELSIF _metric = 'fixed' THEN
    SELECT count(*) INTO _v FROM public.xp_events WHERE user_id = _uid AND day = _day AND source = 'mistake_fixed';
  ELSIF _metric = 'focus' THEN
    SELECT COALESCE(sum(minutes), 0) INTO _v FROM public.focus_sessions
      WHERE user_id = _uid AND completed AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'concepts' THEN
    SELECT count(*) INTO _v FROM public.xp_events WHERE user_id = _uid AND day = _day AND source = 'concept_done';
  ELSIF _metric = 'daily' THEN
    SELECT count(*) INTO _v FROM public.xp_events WHERE user_id = _uid AND day = _day AND source = 'daily_complete';
  ELSIF _metric = 'goal' THEN
    SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid;
    SELECT CASE WHEN COALESCE(sum(amount), 0) >= _p.daily_goal THEN 1 ELSE 0 END INTO _v
      FROM public.xp_events WHERE user_id = _uid AND day = _day AND source NOT IN ('quest_complete', 'quest_bonus');
  ELSE
    _v := 0;
  END IF;
  RETURN COALESCE(_v, 0);
END;
$$;

-- Three quests per user per day, chosen deterministically.
CREATE OR REPLACE FUNCTION public.game_daily_quests(_uid uuid, _day date)
RETURNS TABLE (quest_key text, metric text, target integer, reward integer, title text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.quest_key, c.metric, c.target, c.reward, c.title
  FROM (
    SELECT DISTINCT ON (q.metric) q.*, hashtext(_uid::text || _day::text || q.quest_key) AS h
    FROM public.game_quest_catalogue() q
    ORDER BY q.metric, hashtext(_uid::text || _day::text || q.quest_key)
  ) c
  ORDER BY c.h
  LIMIT 3;
$$;

-- ---------- client RPCs ----------

CREATE OR REPLACE FUNCTION public.get_game_state()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _p public.game_profiles;
  _today date;
  _used integer;
  _today_xp integer;
  _quests jsonb;
  _badges jsonb;
  _history jsonb;
  _due integer;
  _total_mistakes integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  PERFORM public.game_ensure_profile(_uid);
  _used := public.game_settle_streak(_uid);
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid;
  _today := public.game_local_day(_uid);

  SELECT COALESCE(sum(amount), 0) INTO _today_xp FROM public.xp_events WHERE user_id = _uid AND day = _today;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'key', q.quest_key, 'title', q.title, 'target', q.target, 'reward', q.reward,
      'progress', LEAST(q.target, public.game_quest_metric(_uid, q.metric, _today)),
      'claimed', EXISTS (SELECT 1 FROM public.xp_events e WHERE e.user_id = _uid AND e.source = 'quest_complete' AND e.ref_id = _today::text || ':' || q.quest_key)
    )), '[]'::jsonb)
    INTO _quests FROM public.game_daily_quests(_uid, _today) q;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('id', badge_id, 'unlocked_at', unlocked_at) ORDER BY unlocked_at), '[]'::jsonb)
    INTO _badges FROM public.user_badges WHERE user_id = _uid;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('day', d.day, 'xp', d.xp) ORDER BY d.day), '[]'::jsonb)
    INTO _history FROM (
      SELECT day, sum(amount)::integer AS xp FROM public.xp_events
      WHERE user_id = _uid AND day > _today - 120 GROUP BY day
    ) d;

  SELECT count(*) FILTER (WHERE due_at <= now()), count(*) INTO _due, _total_mistakes
    FROM public.mistake_queue WHERE user_id = _uid;

  RETURN jsonb_build_object(
    'xp_total', _p.xp_total,
    'today_xp', _today_xp,
    'daily_goal', _p.daily_goal,
    'timezone', _p.timezone,
    'streak', _p.streak,
    'longest_streak', _p.longest_streak,
    'streak_extended_today', _p.last_streak_day = _today,
    'streak_freezes', _p.streak_freezes,
    'freezes_used', _used,
    'current_combo', _p.current_combo,
    'best_combo', _p.best_combo,
    'league_tier', _p.league_tier,
    'league_opt_out', _p.league_opt_out,
    'today', _today,
    'quests', _quests,
    'badges', _badges,
    'history', _history,
    'mistakes_due', _due,
    'mistakes_total', _total_mistakes
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.update_game_settings(_daily_goal integer DEFAULT NULL, _timezone text DEFAULT NULL, _league_opt_out boolean DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  PERFORM public.game_ensure_profile(_uid);
  IF _timezone IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pg_timezone_names WHERE name = _timezone) THEN
    RAISE EXCEPTION 'unknown timezone';
  END IF;
  UPDATE public.game_profiles SET
    daily_goal = COALESCE(_daily_goal, daily_goal),
    timezone = COALESCE(_timezone, timezone),
    league_opt_out = COALESCE(_league_opt_out, league_opt_out)
    WHERE user_id = _uid;
END;
$$;

-- Rewards that are not tied to an attempt row. Each is validated and claimable once.
CREATE OR REPLACE FUNCTION public.claim_xp(_source text, _ref text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _today date;
  _tz text;
  _q record;
  _granted integer := 0;
  _claimed integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  PERFORM public.game_ensure_profile(_uid);
  _today := public.game_local_day(_uid);
  SELECT timezone INTO _tz FROM public.game_profiles WHERE user_id = _uid;

  IF _source = 'concept_done' THEN
    IF _ref IS NULL OR length(_ref) > 120 THEN RETURN 0; END IF;
    IF (SELECT count(*) FROM public.xp_events WHERE user_id = _uid AND day = _today AND source = 'concept_done') >= 20 THEN
      RETURN 0;
    END IF;
    _granted := public.game_grant_xp(_uid, 15, 'concept_done', _ref);
  ELSIF _source = 'daily_complete' THEN
    IF _ref IS DISTINCT FROM _today::text THEN RETURN 0; END IF;
    IF (SELECT count(*) FROM public.attempts WHERE user_id = _uid AND context = 'daily_challenge'
        AND (created_at AT TIME ZONE _tz)::date = _today) < 5 THEN
      RETURN 0;
    END IF;
    _granted := public.game_grant_xp(_uid, 30, 'daily_complete', _ref);
  ELSIF _source = 'quest_complete' THEN
    SELECT * INTO _q FROM public.game_daily_quests(_uid, _today) q WHERE q.quest_key = _ref;
    IF _q.quest_key IS NULL THEN RETURN 0; END IF;
    IF public.game_quest_metric(_uid, _q.metric, _today) < _q.target THEN RETURN 0; END IF;
    _granted := public.game_grant_xp(_uid, _q.reward, 'quest_complete', _today::text || ':' || _ref);
    -- Clearing all three quests earns a streak freeze.
    SELECT count(*) INTO _claimed FROM public.xp_events
      WHERE user_id = _uid AND source = 'quest_complete' AND ref_id LIKE _today::text || ':%';
    IF _granted > 0 AND _claimed >= 3 THEN
      IF public.game_grant_xp(_uid, 10, 'quest_bonus', _today::text) > 0 THEN
        UPDATE public.game_profiles SET streak_freezes = LEAST(2, streak_freezes + 1) WHERE user_id = _uid;
      END IF;
    END IF;
  ELSE
    RETURN 0;
  END IF;

  PERFORM public.game_check_badges(_uid);
  RETURN _granted;
END;
$$;

-- Weekly league: lazily settles last week's promotion/demotion, then joins a cohort of up to 30.
CREATE OR REPLACE FUNCTION public.get_league()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _p public.game_profiles;
  _week date := date_trunc('week', now() AT TIME ZONE 'UTC')::date;
  _me public.league_memberships;
  _prev public.league_memberships;
  _prev_rank integer;
  _prev_size integer;
  _prev_xp integer;
  _tier integer;
  _cohort integer;
  _week_xp integer;
  _members jsonb;
  _outcome text := NULL;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _p := public.game_ensure_profile(_uid);
  IF _p.league_opt_out THEN
    RETURN jsonb_build_object('status', 'opted_out', 'tier', _p.league_tier);
  END IF;

  SELECT * INTO _me FROM public.league_memberships WHERE user_id = _uid AND week_start = _week;

  IF _me.user_id IS NULL THEN
    _tier := _p.league_tier;
    SELECT * INTO _prev FROM public.league_memberships WHERE user_id = _uid AND week_start = _week - 7;
    IF _prev.user_id IS NOT NULL THEN
      WITH standings AS (
        SELECT m.user_id,
          COALESCE((SELECT sum(e.amount) FROM public.xp_events e
            WHERE e.user_id = m.user_id AND e.created_at >= (_week - 7)::timestamp AT TIME ZONE 'UTC'
              AND e.created_at < _week::timestamp AT TIME ZONE 'UTC'), 0) AS xp
        FROM public.league_memberships m
        WHERE m.week_start = _prev.week_start AND m.tier = _prev.tier AND m.cohort = _prev.cohort
      ), ranked AS (
        SELECT user_id, xp, rank() OVER (ORDER BY xp DESC) AS r, count(*) OVER () AS n FROM standings
      )
      SELECT r, n, xp INTO _prev_rank, _prev_size, _prev_xp FROM ranked WHERE user_id = _uid;
      _tier := _prev.tier;
      IF _prev_rank <= 7 AND _prev_xp > 0 AND _tier < 6 THEN
        _tier := _tier + 1; _outcome := 'promoted';
      ELSIF _prev_size >= 10 AND _prev_rank > _prev_size - 5 AND _tier > 0 THEN
        _tier := _tier - 1; _outcome := 'demoted';
      ELSE
        _outcome := 'stayed';
      END IF;
      UPDATE public.game_profiles SET league_tier = _tier WHERE user_id = _uid;
    END IF;

    SELECT COALESCE(sum(amount), 0) INTO _week_xp FROM public.xp_events
      WHERE user_id = _uid AND created_at >= _week::timestamp AT TIME ZONE 'UTC';
    IF _week_xp = 0 THEN
      RETURN jsonb_build_object('status', 'not_joined', 'tier', _tier, 'week_start', _week, 'last_outcome', _outcome);
    END IF;

    PERFORM pg_advisory_xact_lock(hashtext('league:' || _week::text || ':' || _tier::text));
    SELECT cohort INTO _cohort FROM public.league_memberships
      WHERE week_start = _week AND tier = _tier
      GROUP BY cohort HAVING count(*) < 30 ORDER BY cohort LIMIT 1;
    IF _cohort IS NULL THEN
      SELECT COALESCE(max(cohort), 0) + 1 INTO _cohort FROM public.league_memberships WHERE week_start = _week AND tier = _tier;
    END IF;
    INSERT INTO public.league_memberships (user_id, week_start, tier, cohort)
      VALUES (_uid, _week, _tier, _cohort)
      ON CONFLICT (user_id, week_start) DO NOTHING;
    SELECT * INTO _me FROM public.league_memberships WHERE user_id = _uid AND week_start = _week;
  END IF;

  SELECT COALESCE(jsonb_agg(row_to_json(s)::jsonb ORDER BY s.rank, s.name), '[]'::jsonb) INTO _members FROM (
    SELECT
      CASE WHEN m.user_id = _uid THEN true ELSE false END AS is_me,
      COALESCE(NULLIF(pr.display_name, ''), 'Doctor') AS name,
      COALESCE((SELECT sum(e.amount) FROM public.xp_events e
        WHERE e.user_id = m.user_id AND e.created_at >= _week::timestamp AT TIME ZONE 'UTC'), 0)::integer AS xp,
      rank() OVER (ORDER BY COALESCE((SELECT sum(e.amount) FROM public.xp_events e
        WHERE e.user_id = m.user_id AND e.created_at >= _week::timestamp AT TIME ZONE 'UTC'), 0) DESC)::integer AS rank
    FROM public.league_memberships m
    LEFT JOIN public.profiles pr ON pr.id = m.user_id
    WHERE m.week_start = _week AND m.tier = _me.tier AND m.cohort = _me.cohort
  ) s;

  RETURN jsonb_build_object(
    'status', 'joined',
    'tier', _me.tier,
    'week_start', _week,
    'ends_at', (_week + 7)::timestamp AT TIME ZONE 'UTC',
    'last_outcome', _outcome,
    'members', _members
  );
END;
$$;

-- Lock down: internal helpers are not callable by clients; RPCs only by signed-in users.
REVOKE EXECUTE ON FUNCTION public.game_ensure_profile(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_local_day(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_settle_streak(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_award_badge(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_check_badges(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_grant_xp(uuid, integer, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_on_attempt() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_on_focus_session() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_quest_metric(uuid, text, date) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_daily_quests(uuid, date) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_game_state() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.update_game_settings(integer, text, boolean) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_xp(text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_league() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_game_state() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_game_settings(integer, text, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_xp(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_league() TO authenticated;
