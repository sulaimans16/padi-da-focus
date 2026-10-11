-- Flashcards with FSRS spaced repetition.
-- Cards are identified by a stable text id (e.g. "learn:anatomy/brachial-plexus:hy",
-- "q:<question uuid>", "c:<custom card uuid>"). The client computes the FSRS schedule;
-- the server stores it and awards XP only for reviews of cards that were actually due.
-- Every table carries an `exam` so other exams can share this model later.

CREATE TABLE public.flashcard_reviews (
  user_id uuid NOT NULL,
  card_id text NOT NULL CHECK (length(card_id) <= 200),
  exam text NOT NULL DEFAULT 'neet_pg',
  deck text NOT NULL DEFAULT '',
  stability double precision NOT NULL,
  difficulty double precision NOT NULL,
  reps integer NOT NULL DEFAULT 0,
  lapses integer NOT NULL DEFAULT 0,
  last_rating integer NOT NULL,
  due_at timestamptz NOT NULL,
  last_review_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, card_id)
);
CREATE INDEX flashcard_reviews_due_idx ON public.flashcard_reviews (user_id, exam, due_at);
GRANT SELECT ON public.flashcard_reviews TO authenticated;
GRANT ALL ON public.flashcard_reviews TO service_role;
ALTER TABLE public.flashcard_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own flashcard reviews" ON public.flashcard_reviews FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.flashcards_custom (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  exam text NOT NULL DEFAULT 'neet_pg',
  deck text NOT NULL DEFAULT 'My cards' CHECK (length(deck) <= 80),
  front text NOT NULL CHECK (length(front) BETWEEN 1 AND 600),
  back text NOT NULL CHECK (length(back) BETWEEN 1 AND 1200),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX flashcards_custom_user_idx ON public.flashcards_custom (user_id, exam, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.flashcards_custom TO authenticated;
GRANT ALL ON public.flashcards_custom TO service_role;
ALTER TABLE public.flashcards_custom ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own custom flashcards" ON public.flashcards_custom FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Store one review. Returns XP granted (2 for a due card, 0 for early re-reviews,
-- capped at 60 rewarded reviews per day).
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
  -- Keep the schedule sane whatever the client sends.
  _stability := LEAST(GREATEST(COALESCE(_stability, 0.1), 0.01), 36500);
  _difficulty := LEAST(GREATEST(COALESCE(_difficulty, 5), 1), 10);
  _due_at := LEAST(GREATEST(_due_at, now()), now() + interval '100 years');

  PERFORM public.game_ensure_profile(_uid);
  _today := public.game_local_day(_uid);
  SELECT * INTO _prev FROM public.flashcard_reviews WHERE user_id = _uid AND card_id = _card_id;

  INSERT INTO public.flashcard_reviews AS r
    (user_id, card_id, exam, deck, stability, difficulty, reps, lapses, last_rating, due_at, last_review_at)
  VALUES
    (_uid, _card_id, COALESCE(_exam, 'neet_pg'), left(COALESCE(_deck, ''), 120), _stability, _difficulty,
     1, CASE WHEN _rating = 1 THEN 1 ELSE 0 END, _rating, _due_at, now())
  ON CONFLICT (user_id, card_id) DO UPDATE SET
    stability = EXCLUDED.stability,
    difficulty = EXCLUDED.difficulty,
    reps = r.reps + 1,
    lapses = r.lapses + CASE WHEN _rating = 1 THEN 1 ELSE 0 END,
    last_rating = _rating,
    due_at = EXCLUDED.due_at,
    last_review_at = now(),
    deck = CASE WHEN EXCLUDED.deck <> '' THEN EXCLUDED.deck ELSE r.deck END;

  -- XP only for new cards or cards that were due; one reward per card per day.
  IF _prev.user_id IS NULL OR _prev.due_at <= now() + interval '1 minute' THEN
    SELECT count(*) INTO _rewarded FROM public.xp_events
      WHERE user_id = _uid AND day = _today AND source = 'flashcard';
    IF _rewarded < 60 AND NOT EXISTS (
      SELECT 1 FROM public.xp_events
      WHERE user_id = _uid AND day = _today AND source = 'flashcard' AND ref_id = _card_id
    ) THEN
      _granted := public.game_grant_xp(_uid, 2, 'flashcard', _card_id);
    END IF;
  END IF;
  RETURN _granted;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.review_flashcard(text, integer, double precision, double precision, timestamptz, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_flashcard(text, integer, double precision, double precision, timestamptz, text, text) TO authenticated;

-- New daily quest: review flashcards.
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
    ('xp_goal', 'goal', 1, 15, 'Hit your daily XP goal'),
    ('review_10', 'reviews', 10, 20, 'Review 10 flashcards'),
    ('review_25', 'reviews', 25, 35, 'Review 25 flashcards')
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
  ELSIF _metric = 'reviews' THEN
    SELECT count(*) INTO _v FROM public.flashcard_reviews
      WHERE user_id = _uid AND (last_review_at AT TIME ZONE _tz)::date = _day;
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
