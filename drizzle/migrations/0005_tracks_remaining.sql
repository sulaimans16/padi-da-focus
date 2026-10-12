-- Exam tracks (idempotent re-apply): adds `exam` to every per-user game table and makes all game functions exam-aware.

-- ---------- columns ----------

ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS questions_exam_check;
ALTER TABLE public.questions ADD CONSTRAINT questions_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
CREATE INDEX IF NOT EXISTS questions_exam_subject_idx ON public.questions (exam, subject, topic);
CREATE INDEX IF NOT EXISTS questions_exam_pyq_idx ON public.questions (exam, is_pyq, pyq_year DESC);

ALTER TABLE public.attempts ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.attempts DROP CONSTRAINT IF EXISTS attempts_exam_check;
ALTER TABLE public.attempts ADD CONSTRAINT attempts_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
CREATE INDEX IF NOT EXISTS attempts_user_exam_idx ON public.attempts (user_id, exam, created_at DESC);

ALTER TABLE public.bookmarks ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_exam_check;
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));

ALTER TABLE public.focus_sessions ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.focus_sessions DROP CONSTRAINT IF EXISTS focus_sessions_exam_check;
ALTER TABLE public.focus_sessions ADD CONSTRAINT focus_sessions_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));

ALTER TABLE public.goals ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.goals DROP CONSTRAINT IF EXISTS goals_exam_check;
ALTER TABLE public.goals ADD CONSTRAINT goals_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));

ALTER TABLE public.game_profiles ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.game_profiles DROP CONSTRAINT IF EXISTS game_profiles_exam_check;
ALTER TABLE public.game_profiles ADD CONSTRAINT game_profiles_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
ALTER TABLE public.game_profiles DROP CONSTRAINT IF EXISTS game_profiles_pkey;
ALTER TABLE public.game_profiles ADD PRIMARY KEY (user_id, exam);

ALTER TABLE public.xp_events ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.xp_events DROP CONSTRAINT IF EXISTS xp_events_exam_check;
ALTER TABLE public.xp_events ADD CONSTRAINT xp_events_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
DROP INDEX IF EXISTS public.xp_events_once_idx;
CREATE UNIQUE INDEX IF NOT EXISTS xp_events_once_idx ON public.xp_events (user_id, exam, source, ref_id)
  WHERE source IN ('concept_done', 'daily_complete', 'quest_complete', 'quest_bonus');
DROP INDEX IF EXISTS public.xp_events_user_day_idx;
CREATE INDEX IF NOT EXISTS xp_events_user_day_idx ON public.xp_events (user_id, exam, day DESC);
CREATE INDEX IF NOT EXISTS xp_events_exam_created_idx ON public.xp_events (exam, created_at DESC, user_id);

ALTER TABLE public.user_badges ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.user_badges DROP CONSTRAINT IF EXISTS user_badges_exam_check;
ALTER TABLE public.user_badges ADD CONSTRAINT user_badges_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
ALTER TABLE public.user_badges DROP CONSTRAINT IF EXISTS user_badges_pkey;
ALTER TABLE public.user_badges ADD PRIMARY KEY (user_id, exam, badge_id);

ALTER TABLE public.mistake_queue ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.mistake_queue DROP CONSTRAINT IF EXISTS mistake_queue_exam_check;
ALTER TABLE public.mistake_queue ADD CONSTRAINT mistake_queue_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
ALTER TABLE public.mistake_queue DROP CONSTRAINT IF EXISTS mistake_queue_pkey;
ALTER TABLE public.mistake_queue ADD PRIMARY KEY (user_id, exam, question_id);
DROP INDEX IF EXISTS public.mistake_queue_due_idx;
CREATE INDEX IF NOT EXISTS mistake_queue_due_idx ON public.mistake_queue (user_id, exam, due_at);

ALTER TABLE public.league_memberships ADD COLUMN IF NOT EXISTS exam text NOT NULL DEFAULT 'neet_pg';
ALTER TABLE public.league_memberships DROP CONSTRAINT IF EXISTS league_memberships_exam_check;
ALTER TABLE public.league_memberships ADD CONSTRAINT league_memberships_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
ALTER TABLE public.league_memberships DROP CONSTRAINT IF EXISTS league_memberships_pkey;
ALTER TABLE public.league_memberships ADD PRIMARY KEY (user_id, exam, week_start);
DROP INDEX IF EXISTS public.league_memberships_cohort_idx;
CREATE INDEX IF NOT EXISTS league_memberships_cohort_idx ON public.league_memberships (exam, week_start, tier, cohort);

ALTER TABLE public.flashcard_reviews DROP CONSTRAINT IF EXISTS flashcard_reviews_pkey;
ALTER TABLE public.flashcard_reviews ADD PRIMARY KEY (user_id, exam, card_id);
ALTER TABLE public.flashcard_reviews DROP CONSTRAINT IF EXISTS flashcard_reviews_exam_check;
ALTER TABLE public.flashcard_reviews ADD CONSTRAINT flashcard_reviews_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));
ALTER TABLE public.flashcards_custom DROP CONSTRAINT IF EXISTS flashcards_custom_exam_check;
ALTER TABLE public.flashcards_custom ADD CONSTRAINT flashcards_custom_exam_check CHECK (exam IN ('neet_pg', 'neet_ug'));

-- ---------- drop the single-exam functions (signatures change) ----------

DROP TRIGGER IF EXISTS game_on_attempt ON public.attempts;
DROP TRIGGER IF EXISTS game_on_focus_session ON public.focus_sessions;
DROP FUNCTION IF EXISTS public.game_on_attempt();
DROP FUNCTION IF EXISTS public.game_on_focus_session();
DROP FUNCTION IF EXISTS public.get_game_state();
DROP FUNCTION IF EXISTS public.update_game_settings(integer, text, boolean);
DROP FUNCTION IF EXISTS public.claim_xp(text, text);
DROP FUNCTION IF EXISTS public.get_league();
DROP FUNCTION IF EXISTS public.review_flashcard(text, integer, double precision, double precision, timestamptz, text, text);
DROP FUNCTION IF EXISTS public.game_daily_quests(uuid, date);
DROP FUNCTION IF EXISTS public.game_quest_metric(uuid, text, date);
DROP FUNCTION IF EXISTS public.game_grant_xp(uuid, integer, text, text);
DROP FUNCTION IF EXISTS public.game_check_badges(uuid);
DROP FUNCTION IF EXISTS public.game_award_badge(uuid, text);
DROP FUNCTION IF EXISTS public.game_settle_streak(uuid);
DROP FUNCTION IF EXISTS public.game_local_day(uuid);
DROP FUNCTION IF EXISTS public.game_ensure_profile(uuid);

-- ---------- internal helpers ----------

CREATE OR REPLACE FUNCTION public.game_valid_exam(_exam text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF _exam IS NULL THEN RETURN 'neet_pg'; END IF;
  IF _exam NOT IN ('neet_pg', 'neet_ug') THEN RAISE EXCEPTION 'unknown exam'; END IF;
  RETURN _exam;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_ensure_profile(_uid uuid, _exam text)
RETURNS public.game_profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.game_profiles;
BEGIN
  INSERT INTO public.game_profiles (user_id, exam, timezone)
  VALUES (_uid, _exam, COALESCE((SELECT timezone FROM public.game_profiles WHERE user_id = _uid LIMIT 1), 'Asia/Kolkata'))
  ON CONFLICT (user_id, exam) DO NOTHING;
  SELECT * INTO _row FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
  RETURN _row;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_local_day(_uid uuid, _exam text)
RETURNS date
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (now() AT TIME ZONE COALESCE(
    (SELECT timezone FROM public.game_profiles WHERE user_id = _uid AND exam = _exam), 'Asia/Kolkata'))::date;
$$;

CREATE OR REPLACE FUNCTION public.game_settle_streak(_uid uuid, _exam text)
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
  _p := public.game_ensure_profile(_uid, _exam);
  _today := public.game_local_day(_uid, _exam);
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
      WHERE user_id = _uid AND exam = _exam;
    RETURN _missed;
  END IF;
  UPDATE public.game_profiles SET streak = 0 WHERE user_id = _uid AND exam = _exam;
  RETURN 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_award_badge(_uid uuid, _exam text, _badge text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.user_badges (user_id, exam, badge_id) VALUES (_uid, _exam, _badge) ON CONFLICT DO NOTHING;
$$;

CREATE OR REPLACE FUNCTION public.game_check_badges(_uid uuid, _exam text)
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
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
  SELECT count(*) FILTER (WHERE correct), count(*) FILTER (WHERE correct AND context = 'pyq')
    INTO _correct, _pyq FROM public.attempts WHERE user_id = _uid AND exam = _exam;
  SELECT count(*) FILTER (WHERE source = 'mistake_fixed'),
         count(*) FILTER (WHERE source = 'concept_done'),
         count(*) FILTER (WHERE source = 'daily_complete')
    INTO _fixed, _concepts, _dailies FROM public.xp_events WHERE user_id = _uid AND exam = _exam;
  SELECT count(*) FILTER (WHERE completed), bool_or(completed AND minutes >= 60)
    INTO _focus, _long_focus FROM public.focus_sessions WHERE user_id = _uid AND exam = _exam;
  SELECT EXISTS (
    SELECT 1 FROM public.attempts WHERE user_id = _uid AND exam = _exam
    GROUP BY subject HAVING count(*) >= 50 AND avg(CASE WHEN correct THEN 1 ELSE 0 END) >= 0.8
  ) INTO _master;

  IF _correct >= 1 THEN PERFORM public.game_award_badge(_uid, _exam, 'first_blood'); END IF;
  IF _correct >= 100 THEN PERFORM public.game_award_badge(_uid, _exam, 'century'); END IF;
  IF _correct >= 1000 THEN PERFORM public.game_award_badge(_uid, _exam, 'thousand'); END IF;
  IF _pyq >= 50 THEN PERFORM public.game_award_badge(_uid, _exam, 'pyq_hunter'); END IF;
  IF _fixed >= 25 THEN PERFORM public.game_award_badge(_uid, _exam, 'mistake_slayer'); END IF;
  IF _concepts >= 10 THEN PERFORM public.game_award_badge(_uid, _exam, 'scholar'); END IF;
  IF _dailies >= 7 THEN PERFORM public.game_award_badge(_uid, _exam, 'daily_devotee'); END IF;
  IF _focus >= 10 THEN PERFORM public.game_award_badge(_uid, _exam, 'focus_ten'); END IF;
  IF COALESCE(_long_focus, false) THEN PERFORM public.game_award_badge(_uid, _exam, 'iron_focus'); END IF;
  IF _master THEN PERFORM public.game_award_badge(_uid, _exam, 'subject_master'); END IF;
  IF _p.best_combo >= 10 THEN PERFORM public.game_award_badge(_uid, _exam, 'combo_10'); END IF;
  IF _p.best_combo >= 25 THEN PERFORM public.game_award_badge(_uid, _exam, 'combo_25'); END IF;
  IF _p.longest_streak >= 7 THEN PERFORM public.game_award_badge(_uid, _exam, 'streak_7'); END IF;
  IF _p.longest_streak >= 30 THEN PERFORM public.game_award_badge(_uid, _exam, 'streak_30'); END IF;
  IF _p.longest_streak >= 100 THEN PERFORM public.game_award_badge(_uid, _exam, 'streak_100'); END IF;
  IF _p.xp_total >= 5000 THEN PERFORM public.game_award_badge(_uid, _exam, 'xp_5000'); END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.game_grant_xp(_uid uuid, _exam text, _amount integer, _source text, _ref text)
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
  PERFORM public.game_ensure_profile(_uid, _exam);
  _today := public.game_local_day(_uid, _exam);

  INSERT INTO public.xp_events (user_id, exam, amount, source, ref_id, day)
  VALUES (_uid, _exam, _amount, _source, COALESCE(_ref, ''), _today)
  ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS _inserted = ROW_COUNT;
  IF _inserted = 0 THEN RETURN 0; END IF;

  UPDATE public.game_profiles SET xp_total = xp_total + _amount WHERE user_id = _uid AND exam = _exam;

  PERFORM public.game_settle_streak(_uid, _exam);
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
  IF _p.last_streak_day IS DISTINCT FROM _today THEN
    SELECT COALESCE(sum(amount), 0) INTO _today_xp FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _today;
    IF _today_xp >= _p.daily_goal THEN
      UPDATE public.game_profiles SET
        streak = CASE WHEN _p.last_streak_day = _today - 1 AND _p.streak > 0 THEN _p.streak + 1 ELSE 1 END,
        last_streak_day = _today
        WHERE user_id = _uid AND exam = _exam
        RETURNING * INTO _p;
      UPDATE public.game_profiles SET
        longest_streak = GREATEST(longest_streak, streak),
        streak_freezes = CASE WHEN streak % 7 = 0 THEN LEAST(2, streak_freezes + 1) ELSE streak_freezes END
        WHERE user_id = _uid AND exam = _exam;
    END IF;
  END IF;
  RETURN _amount;
END;
$$;

-- ---------- triggers ----------

CREATE OR REPLACE FUNCTION public.game_attempt_exam()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _qexam text;
BEGIN
  NEW.exam := public.game_valid_exam(NEW.exam);
  IF NEW.question_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    SELECT exam INTO _qexam FROM public.questions WHERE id = NEW.question_id::uuid;
    IF _qexam IS NOT NULL THEN NEW.exam := _qexam; END IF;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS game_attempt_exam ON public.attempts;
CREATE TRIGGER game_attempt_exam BEFORE INSERT ON public.attempts
FOR EACH ROW EXECUTE FUNCTION public.game_attempt_exam();

CREATE OR REPLACE FUNCTION public.game_on_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _exam text := NEW.exam;
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
  _p := public.game_ensure_profile(NEW.user_id, _exam);
  _today := public.game_local_day(NEW.user_id, _exam);

  IF NEW.question_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    SELECT correct_option_id INTO _truth FROM public.questions WHERE id = NEW.question_id::uuid;
    IF _truth IS NOT NULL THEN _correct := (NEW.chosen_option_id = _truth); END IF;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.attempts
    WHERE user_id = NEW.user_id AND question_id = NEW.question_id AND context = NEW.context
      AND id <> NEW.id AND created_at > now() - interval '10 minutes'
  ) INTO _repeat;
  SELECT count(*) INTO _burst FROM public.attempts
    WHERE user_id = NEW.user_id AND created_at > now() - interval '1 minute';

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
    WHERE user_id = NEW.user_id AND exam = _exam;

  IF NOT _repeat AND _burst <= 30 THEN
    _amount := CASE WHEN _correct THEN 10 + LEAST(10, 2 * GREATEST(0, _combo - 1)) ELSE 2 END;
    PERFORM public.game_grant_xp(NEW.user_id, _exam, _amount, 'answer', NEW.question_id);
  END IF;

  SELECT * INTO _queued FROM public.mistake_queue
    WHERE user_id = NEW.user_id AND exam = _exam AND question_id = NEW.question_id;
  IF NOT _correct THEN
    INSERT INTO public.mistake_queue (user_id, exam, question_id, subject, stage, due_at)
    VALUES (NEW.user_id, _exam, NEW.question_id, NEW.subject, 0, now())
    ON CONFLICT (user_id, exam, question_id) DO UPDATE SET stage = 0, due_at = now();
  ELSIF _queued.question_id IS NOT NULL AND _queued.due_at <= now() THEN
    IF _queued.stage >= 3 THEN
      DELETE FROM public.mistake_queue
        WHERE user_id = NEW.user_id AND exam = _exam AND question_id = NEW.question_id;
    ELSE
      UPDATE public.mistake_queue SET
        stage = _queued.stage + 1,
        due_at = now() + (CASE _queued.stage WHEN 0 THEN interval '1 day' WHEN 1 THEN interval '3 days' ELSE interval '7 days' END)
        WHERE user_id = NEW.user_id AND exam = _exam AND question_id = NEW.question_id;
    END IF;
    PERFORM public.game_grant_xp(NEW.user_id, _exam, 15, 'mistake_fixed', NEW.question_id);
  END IF;

  PERFORM public.game_check_badges(NEW.user_id, _exam);
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS game_on_attempt ON public.attempts;
CREATE TRIGGER game_on_attempt AFTER INSERT ON public.attempts
FOR EACH ROW EXECUTE FUNCTION public.game_on_attempt();

CREATE OR REPLACE FUNCTION public.game_on_focus_session()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _exam text := public.game_valid_exam(NEW.exam);
  _elapsed integer;
  _minutes integer;
BEGIN
  IF NOT NEW.completed THEN RETURN NEW; END IF;
  _elapsed := CEIL(EXTRACT(EPOCH FROM (now() - NEW.started_at)) / 60.0)::integer + 1;
  _minutes := LEAST(NEW.minutes, GREATEST(NEW.planned_minutes, 0), _elapsed, 60);
  PERFORM public.game_grant_xp(NEW.user_id, _exam, _minutes, 'focus', NEW.id::text);
  PERFORM public.game_check_badges(NEW.user_id, _exam);
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS game_on_focus_session ON public.focus_sessions;
CREATE TRIGGER game_on_focus_session AFTER INSERT ON public.focus_sessions
FOR EACH ROW EXECUTE FUNCTION public.game_on_focus_session();

-- ---------- quests ----------

CREATE OR REPLACE FUNCTION public.game_quest_metric(_uid uuid, _exam text, _metric text, _day date)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _tz text := COALESCE((SELECT timezone FROM public.game_profiles WHERE user_id = _uid AND exam = _exam), 'Asia/Kolkata');
  _p public.game_profiles;
  _v integer;
BEGIN
  IF _metric = 'answers' THEN
    SELECT count(*) INTO _v FROM public.attempts
      WHERE user_id = _uid AND exam = _exam AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'correct' THEN
    SELECT count(*) INTO _v FROM public.attempts
      WHERE user_id = _uid AND exam = _exam AND correct AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'combo' THEN
    SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
    _v := CASE WHEN _p.combo_day = _day THEN _p.best_combo_today ELSE 0 END;
  ELSIF _metric = 'fixed' THEN
    SELECT count(*) INTO _v FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _day AND source = 'mistake_fixed';
  ELSIF _metric = 'focus' THEN
    SELECT COALESCE(sum(minutes), 0) INTO _v FROM public.focus_sessions
      WHERE user_id = _uid AND exam = _exam AND completed AND (created_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'concepts' THEN
    SELECT count(*) INTO _v FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _day AND source = 'concept_done';
  ELSIF _metric = 'daily' THEN
    SELECT count(*) INTO _v FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _day AND source = 'daily_complete';
  ELSIF _metric = 'reviews' THEN
    SELECT count(*) INTO _v FROM public.flashcard_reviews
      WHERE user_id = _uid AND exam = _exam AND (last_review_at AT TIME ZONE _tz)::date = _day;
  ELSIF _metric = 'goal' THEN
    SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
    SELECT CASE WHEN COALESCE(sum(amount), 0) >= _p.daily_goal THEN 1 ELSE 0 END INTO _v
      FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _day AND source NOT IN ('quest_complete', 'quest_bonus');
  ELSE
    _v := 0;
  END IF;
  RETURN COALESCE(_v, 0);
END;
$$;

CREATE OR REPLACE FUNCTION public.game_daily_quests(_uid uuid, _exam text, _day date)
RETURNS TABLE (quest_key text, metric text, target integer, reward integer, title text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.quest_key, c.metric, c.target, c.reward, c.title
  FROM (
    SELECT DISTINCT ON (q.metric) q.*, hashtext(_uid::text || _exam || _day::text || q.quest_key) AS h
    FROM public.game_quest_catalogue() q
    ORDER BY q.metric, hashtext(_uid::text || _exam || _day::text || q.quest_key)
  ) c
  ORDER BY c.h
  LIMIT 3;
$$;

-- ---------- client RPCs ----------

CREATE OR REPLACE FUNCTION public.get_game_state(_exam text DEFAULT 'neet_pg')
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
  _exam := public.game_valid_exam(_exam);
  PERFORM public.game_ensure_profile(_uid, _exam);
  _used := public.game_settle_streak(_uid, _exam);
  SELECT * INTO _p FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;
  _today := public.game_local_day(_uid, _exam);

  SELECT COALESCE(sum(amount), 0) INTO _today_xp FROM public.xp_events
    WHERE user_id = _uid AND exam = _exam AND day = _today;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'key', q.quest_key, 'title', q.title, 'target', q.target, 'reward', q.reward,
      'progress', LEAST(q.target, public.game_quest_metric(_uid, _exam, q.metric, _today)),
      'claimed', EXISTS (SELECT 1 FROM public.xp_events e
        WHERE e.user_id = _uid AND e.exam = _exam AND e.source = 'quest_complete'
          AND e.ref_id = _today::text || ':' || q.quest_key)
    )), '[]'::jsonb)
    INTO _quests FROM public.game_daily_quests(_uid, _exam, _today) q;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('id', badge_id, 'unlocked_at', unlocked_at) ORDER BY unlocked_at), '[]'::jsonb)
    INTO _badges FROM public.user_badges WHERE user_id = _uid AND exam = _exam;

  SELECT COALESCE(jsonb_agg(jsonb_build_object('day', d.day, 'xp', d.xp) ORDER BY d.day), '[]'::jsonb)
    INTO _history FROM (
      SELECT day, sum(amount)::integer AS xp FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day > _today - 120 GROUP BY day
    ) d;

  SELECT count(*) FILTER (WHERE due_at <= now()), count(*) INTO _due, _total_mistakes
    FROM public.mistake_queue WHERE user_id = _uid AND exam = _exam;

  RETURN jsonb_build_object(
    'exam', _exam,
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

CREATE OR REPLACE FUNCTION public.update_game_settings(
  _daily_goal integer DEFAULT NULL,
  _timezone text DEFAULT NULL,
  _league_opt_out boolean DEFAULT NULL,
  _exam text DEFAULT 'neet_pg'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _exam := public.game_valid_exam(_exam);
  PERFORM public.game_ensure_profile(_uid, _exam);
  IF _timezone IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pg_timezone_names WHERE name = _timezone) THEN
    RAISE EXCEPTION 'unknown timezone';
  END IF;
  UPDATE public.game_profiles SET
    daily_goal = COALESCE(_daily_goal, daily_goal),
    league_opt_out = COALESCE(_league_opt_out, league_opt_out)
    WHERE user_id = _uid AND exam = _exam;
  IF _timezone IS NOT NULL THEN
    UPDATE public.game_profiles SET timezone = _timezone WHERE user_id = _uid;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.claim_xp(_source text, _ref text, _exam text DEFAULT 'neet_pg')
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
  _exam := public.game_valid_exam(_exam);
  PERFORM public.game_ensure_profile(_uid, _exam);
  _today := public.game_local_day(_uid, _exam);
  SELECT timezone INTO _tz FROM public.game_profiles WHERE user_id = _uid AND exam = _exam;

  IF _source = 'concept_done' THEN
    IF _ref IS NULL OR length(_ref) > 120 THEN RETURN 0; END IF;
    IF (SELECT count(*) FROM public.xp_events
        WHERE user_id = _uid AND exam = _exam AND day = _today AND source = 'concept_done') >= 20 THEN
      RETURN 0;
    END IF;
    _granted := public.game_grant_xp(_uid, _exam, 15, 'concept_done', _ref);
  ELSIF _source = 'daily_complete' THEN
    IF _ref IS DISTINCT FROM _today::text THEN RETURN 0; END IF;
    IF (SELECT count(*) FROM public.attempts
        WHERE user_id = _uid AND exam = _exam AND context = 'daily_challenge'
          AND (created_at AT TIME ZONE _tz)::date = _today) < 5 THEN
      RETURN 0;
    END IF;
    _granted := public.game_grant_xp(_uid, _exam, 30, 'daily_complete', _ref);
  ELSIF _source = 'quest_complete' THEN
    SELECT * INTO _q FROM public.game_daily_quests(_uid, _exam, _today) q WHERE q.quest_key = _ref;
    IF _q.quest_key IS NULL THEN RETURN 0; END IF;
    IF public.game_quest_metric(_uid, _exam, _q.metric, _today) < _q.target THEN RETURN 0; END IF;
    _granted := public.game_grant_xp(_uid, _exam, _q.reward, 'quest_complete', _today::text || ':' || _ref);
    SELECT count(*) INTO _claimed FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND source = 'quest_complete' AND ref_id LIKE _today::text || ':%';
    IF _granted > 0 AND _claimed >= 3 THEN
      IF public.game_grant_xp(_uid, _exam, 10, 'quest_bonus', _today::text) > 0 THEN
        UPDATE public.game_profiles SET streak_freezes = LEAST(2, streak_freezes + 1)
          WHERE user_id = _uid AND exam = _exam;
      END IF;
    END IF;
  ELSE
    RETURN 0;
  END IF;

  PERFORM public.game_check_badges(_uid, _exam);
  RETURN _granted;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_league(_exam text DEFAULT 'neet_pg')
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
  _anon text;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _exam := public.game_valid_exam(_exam);
  _anon := CASE WHEN _exam = 'neet_ug' THEN 'Aspirant' ELSE 'Doctor' END;
  _p := public.game_ensure_profile(_uid, _exam);
  IF _p.league_opt_out THEN
    RETURN jsonb_build_object('status', 'opted_out', 'tier', _p.league_tier);
  END IF;

  SELECT * INTO _me FROM public.league_memberships
    WHERE user_id = _uid AND exam = _exam AND week_start = _week;

  IF _me.user_id IS NULL THEN
    _tier := _p.league_tier;
    SELECT * INTO _prev FROM public.league_memberships
      WHERE user_id = _uid AND exam = _exam AND week_start = _week - 7;
    IF _prev.user_id IS NOT NULL THEN
      WITH standings AS (
        SELECT m.user_id,
          COALESCE((SELECT sum(e.amount) FROM public.xp_events e
            WHERE e.user_id = m.user_id AND e.exam = _exam
              AND e.created_at >= (_week - 7)::timestamp AT TIME ZONE 'UTC'
              AND e.created_at < _week::timestamp AT TIME ZONE 'UTC'), 0) AS xp
        FROM public.league_memberships m
        WHERE m.exam = _exam AND m.week_start = _prev.week_start AND m.tier = _prev.tier AND m.cohort = _prev.cohort
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
      UPDATE public.game_profiles SET league_tier = _tier WHERE user_id = _uid AND exam = _exam;
    END IF;

    SELECT COALESCE(sum(amount), 0) INTO _week_xp FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND created_at >= _week::timestamp AT TIME ZONE 'UTC';
    IF _week_xp = 0 THEN
      RETURN jsonb_build_object('status', 'not_joined', 'tier', _tier, 'week_start', _week, 'last_outcome', _outcome);
    END IF;

    PERFORM pg_advisory_xact_lock(hashtext('league:' || _exam || ':' || _week::text || ':' || _tier::text));
    SELECT cohort INTO _cohort FROM public.league_memberships
      WHERE exam = _exam AND week_start = _week AND tier = _tier
      GROUP BY cohort HAVING count(*) < 30 ORDER BY cohort LIMIT 1;
    IF _cohort IS NULL THEN
      SELECT COALESCE(max(cohort), 0) + 1 INTO _cohort FROM public.league_memberships
        WHERE exam = _exam AND week_start = _week AND tier = _tier;
    END IF;
    INSERT INTO public.league_memberships (user_id, exam, week_start, tier, cohort)
      VALUES (_uid, _exam, _week, _tier, _cohort)
      ON CONFLICT (user_id, exam, week_start) DO NOTHING;
    SELECT * INTO _me FROM public.league_memberships
      WHERE user_id = _uid AND exam = _exam AND week_start = _week;
  END IF;

  SELECT COALESCE(jsonb_agg(row_to_json(s)::jsonb ORDER BY s.rank, s.name), '[]'::jsonb) INTO _members FROM (
    SELECT
      CASE WHEN m.user_id = _uid THEN true ELSE false END AS is_me,
      COALESCE(NULLIF(pr.display_name, ''), _anon) AS name,
      COALESCE((SELECT sum(e.amount) FROM public.xp_events e
        WHERE e.user_id = m.user_id AND e.exam = _exam
          AND e.created_at >= _week::timestamp AT TIME ZONE 'UTC'), 0)::integer AS xp,
      rank() OVER (ORDER BY COALESCE((SELECT sum(e.amount) FROM public.xp_events e
        WHERE e.user_id = m.user_id AND e.exam = _exam
          AND e.created_at >= _week::timestamp AT TIME ZONE 'UTC'), 0) DESC)::integer AS rank
    FROM public.league_memberships m
    LEFT JOIN public.profiles pr ON pr.id = m.user_id
    WHERE m.exam = _exam AND m.week_start = _week AND m.tier = _me.tier AND m.cohort = _me.cohort
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

CREATE OR REPLACE FUNCTION public.review_flashcard(
  _card_id text,
  _rating integer,
  _stability double precision,
  _difficulty double precision,
  _due_at timestamptz,
  _deck text DEFAULT '',
  _exam text DEFAULT 'neet_pg'
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _prev public.flashcard_reviews;
  _today date;
  _rewarded integer;
  _granted integer := 0;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF _rating NOT BETWEEN 1 AND 4 THEN RAISE EXCEPTION 'bad rating'; END IF;
  IF _card_id IS NULL OR length(_card_id) > 200 THEN RAISE EXCEPTION 'bad card'; END IF;
  _exam := public.game_valid_exam(_exam);
  _stability := LEAST(GREATEST(COALESCE(_stability, 0.1), 0.01), 36500);
  _difficulty := LEAST(GREATEST(COALESCE(_difficulty, 5), 1), 10);
  _due_at := LEAST(GREATEST(_due_at, now()), now() + interval '100 years');

  PERFORM public.game_ensure_profile(_uid, _exam);
  _today := public.game_local_day(_uid, _exam);
  SELECT * INTO _prev FROM public.flashcard_reviews
    WHERE user_id = _uid AND exam = _exam AND card_id = _card_id;

  INSERT INTO public.flashcard_reviews AS r
    (user_id, card_id, exam, deck, stability, difficulty, reps, lapses, last_rating, due_at, last_review_at)
  VALUES
    (_uid, _card_id, _exam, left(COALESCE(_deck, ''), 120), _stability, _difficulty,
     1, CASE WHEN _rating = 1 THEN 1 ELSE 0 END, _rating, _due_at, now())
  ON CONFLICT (user_id, exam, card_id) DO UPDATE SET
    stability = EXCLUDED.stability,
    difficulty = EXCLUDED.difficulty,
    reps = r.reps + 1,
    lapses = r.lapses + CASE WHEN _rating = 1 THEN 1 ELSE 0 END,
    last_rating = _rating,
    due_at = EXCLUDED.due_at,
    last_review_at = now(),
    deck = CASE WHEN EXCLUDED.deck <> '' THEN EXCLUDED.deck ELSE r.deck END;

  IF _prev.user_id IS NULL OR _prev.due_at <= now() + interval '1 minute' THEN
    SELECT count(*) INTO _rewarded FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _today AND source = 'flashcard';
    IF _rewarded < 60 AND NOT EXISTS (
      SELECT 1 FROM public.xp_events
      WHERE user_id = _uid AND exam = _exam AND day = _today AND source = 'flashcard' AND ref_id = _card_id
    ) THEN
      _granted := public.game_grant_xp(_uid, _exam, 2, 'flashcard', _card_id);
    END IF;
  END IF;
  RETURN _granted;
END;
$$;

-- ---------- lock down ----------

REVOKE EXECUTE ON FUNCTION public.game_valid_exam(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_ensure_profile(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_local_day(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_settle_streak(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_award_badge(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_check_badges(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_grant_xp(uuid, text, integer, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_attempt_exam() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_on_attempt() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_on_focus_session() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_quest_metric(uuid, text, text, date) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.game_daily_quests(uuid, text, date) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_game_state(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.update_game_settings(integer, text, boolean, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_xp(text, text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_league(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.review_flashcard(text, integer, double precision, double precision, timestamptz, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_game_state(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_game_settings(integer, text, boolean, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_xp(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_league(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.review_flashcard(text, integer, double precision, double precision, timestamptz, text, text) TO authenticated;