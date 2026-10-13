-- Social: unique @usernames, friendships (requests + invite links), friend challenges
-- graded on the server, and an automatic monthly XP sprint per exam track.
-- All writes go through SECURITY DEFINER functions; tables are read-only to clients.

-- ---------- usernames ----------

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_format;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_format
  CHECK (username IS NULL OR username ~ '^[a-z0-9_]{3,20}$');
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_key ON public.profiles (lower(username));

CREATE OR REPLACE FUNCTION public.set_username(_name text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _clean text := lower(btrim(coalesce(_name, '')));
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _clean := regexp_replace(_clean, '^@', '');
  IF _clean !~ '^[a-z0-9_]{3,20}$' THEN
    RAISE EXCEPTION 'Usernames are 3–20 characters: letters, numbers and _ only.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = _clean AND id <> _uid) THEN
    RAISE EXCEPTION 'That username is taken.';
  END IF;
  INSERT INTO public.profiles (id, display_name, username) VALUES (_uid, '', _clean)
    ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, updated_at = now();
  RETURN _clean;
END;
$$;

-- ---------- friendships ----------

CREATE TABLE IF NOT EXISTS public.friendships (
  user_a uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('pending', 'accepted')),
  requested_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_a, user_b),
  CHECK (user_a < user_b)
);
CREATE INDEX IF NOT EXISTS friendships_b_idx ON public.friendships (user_b);
GRANT SELECT ON public.friendships TO authenticated;
GRANT ALL ON public.friendships TO service_role;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own friendships" ON public.friendships;
CREATE POLICY "Users read own friendships" ON public.friendships FOR SELECT TO authenticated
  USING (auth.uid() = user_a OR auth.uid() = user_b);

CREATE OR REPLACE FUNCTION public.social_are_friends(_x uuid, _y uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.friendships
    WHERE user_a = least(_x, _y) AND user_b = greatest(_x, _y) AND status = 'accepted');
$$;

CREATE OR REPLACE FUNCTION public.social_user_by_name(_name text)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE lower(username) = lower(regexp_replace(btrim(_name), '^@', ''));
$$;

-- Send a request, or accept theirs if they already asked. Returns 'pending' | 'accepted'.
CREATE OR REPLACE FUNCTION public.request_friend(_username text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _other uuid := public.social_user_by_name(_username);
  _row public.friendships;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF _other IS NULL THEN RAISE EXCEPTION 'No one has that username.'; END IF;
  IF _other = _uid THEN RAISE EXCEPTION 'That''s you!'; END IF;
  SELECT * INTO _row FROM public.friendships WHERE user_a = least(_uid, _other) AND user_b = greatest(_uid, _other);
  IF _row.user_a IS NULL THEN
    INSERT INTO public.friendships (user_a, user_b, status, requested_by)
      VALUES (least(_uid, _other), greatest(_uid, _other), 'pending', _uid);
    RETURN 'pending';
  END IF;
  IF _row.status = 'pending' AND _row.requested_by <> _uid THEN
    UPDATE public.friendships SET status = 'accepted' WHERE user_a = _row.user_a AND user_b = _row.user_b;
    RETURN 'accepted';
  END IF;
  RETURN _row.status;
END;
$$;

CREATE OR REPLACE FUNCTION public.respond_friend(_other uuid, _accept boolean)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _row public.friendships;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT * INTO _row FROM public.friendships WHERE user_a = least(_uid, _other) AND user_b = greatest(_uid, _other);
  IF _row.user_a IS NULL OR _row.status <> 'pending' OR _row.requested_by = _uid THEN
    RAISE EXCEPTION 'No request to answer.';
  END IF;
  IF _accept THEN
    UPDATE public.friendships SET status = 'accepted' WHERE user_a = _row.user_a AND user_b = _row.user_b;
    RETURN 'accepted';
  END IF;
  DELETE FROM public.friendships WHERE user_a = _row.user_a AND user_b = _row.user_b;
  RETURN 'declined';
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_friend(_other uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.friendships
    WHERE user_a = least(auth.uid(), _other) AND user_b = greatest(auth.uid(), _other);
$$;

-- An invite link is the inviter's consent: become friends straight away.
CREATE OR REPLACE FUNCTION public.accept_invite(_username text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _other uuid := public.social_user_by_name(_username);
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF _other IS NULL OR _other = _uid THEN RETURN 'ignored'; END IF;
  INSERT INTO public.friendships (user_a, user_b, status, requested_by)
    VALUES (least(_uid, _other), greatest(_uid, _other), 'accepted', _other)
    ON CONFLICT (user_a, user_b) DO UPDATE SET status = 'accepted';
  RETURN 'accepted';
END;
$$;

-- Friends and pending requests, with each friend's public study stats for this exam.
CREATE OR REPLACE FUNCTION public.get_friends(_exam text DEFAULT 'neet_pg')
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _week timestamptz := date_trunc('week', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
  _out jsonb;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb ORDER BY t.status DESC, t.week_xp DESC, t.name), '[]'::jsonb)
  INTO _out FROM (
    SELECT
      o.other AS user_id,
      pr.username,
      COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Friend') AS name,
      f.status,
      CASE WHEN f.status = 'accepted' THEN 'friend'
           WHEN f.requested_by = _uid THEN 'outgoing' ELSE 'incoming' END AS direction,
      CASE WHEN f.status = 'accepted' THEN COALESCE(gp.streak, 0) END AS streak,
      CASE WHEN f.status = 'accepted' THEN COALESCE(gp.xp_total, 0) END AS xp_total,
      CASE WHEN f.status = 'accepted' THEN COALESCE((SELECT sum(e.amount) FROM public.xp_events e
        WHERE e.user_id = o.other AND e.exam = _exam AND e.created_at >= _week), 0)::integer END AS week_xp
    FROM public.friendships f
    CROSS JOIN LATERAL (SELECT CASE WHEN f.user_a = _uid THEN f.user_b ELSE f.user_a END AS other) o
    LEFT JOIN public.profiles pr ON pr.id = o.other
    LEFT JOIN public.game_profiles gp ON gp.user_id = o.other AND gp.exam = _exam
    WHERE f.user_a = _uid OR f.user_b = _uid
  ) t;
  RETURN _out;
END;
$$;

-- ---------- friend challenges ----------

CREATE TABLE IF NOT EXISTS public.friend_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam text NOT NULL DEFAULT 'neet_pg' CHECK (exam IN ('neet_pg', 'neet_ug')),
  creator uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opponent uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_ids text[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '7 days',
  creator_answers jsonb,
  creator_score integer,
  creator_seconds integer,
  opponent_answers jsonb,
  opponent_score integer,
  opponent_seconds integer
);
CREATE INDEX IF NOT EXISTS friend_challenges_creator_idx ON public.friend_challenges (creator, exam, created_at DESC);
CREATE INDEX IF NOT EXISTS friend_challenges_opponent_idx ON public.friend_challenges (opponent, exam, created_at DESC);
GRANT ALL ON public.friend_challenges TO service_role;
ALTER TABLE public.friend_challenges ENABLE ROW LEVEL SECURITY;
-- No direct client access: list_challenges hides the opponent's answers until you've played.

CREATE OR REPLACE FUNCTION public.create_challenge(_exam text, _opponent uuid, _question_ids text[])
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _valid integer;
  _open integer;
  _id uuid;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _exam := public.game_valid_exam(_exam);
  IF NOT public.social_are_friends(_uid, _opponent) THEN
    RAISE EXCEPTION 'You can only challenge friends.';
  END IF;
  SELECT count(DISTINCT q.id) INTO _valid FROM public.questions q
    WHERE q.id::text = ANY(_question_ids) AND q.exam = _exam;
  IF _valid < 5 OR _valid > 15 OR _valid <> cardinality(_question_ids) THEN
    RAISE EXCEPTION 'A challenge needs 5–15 questions from the bank.';
  END IF;
  SELECT count(*) INTO _open FROM public.friend_challenges
    WHERE creator = _uid AND exam = _exam AND expires_at > now()
      AND (creator_score IS NULL OR opponent_score IS NULL);
  IF _open >= 10 THEN RAISE EXCEPTION 'You already have 10 open challenges.'; END IF;
  INSERT INTO public.friend_challenges (exam, creator, opponent, question_ids)
    VALUES (_exam, _uid, _opponent, _question_ids) RETURNING id INTO _id;
  RETURN _id;
END;
$$;

-- Grade on the server so a score can't be forged; first submission per player wins.
CREATE OR REPLACE FUNCTION public.submit_challenge(_id uuid, _answers jsonb, _seconds integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _c public.friend_challenges;
  _score integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT * INTO _c FROM public.friend_challenges WHERE id = _id FOR UPDATE;
  IF _c.id IS NULL OR _uid NOT IN (_c.creator, _c.opponent) THEN RAISE EXCEPTION 'Challenge not found.'; END IF;
  IF _c.expires_at <= now() THEN RAISE EXCEPTION 'This challenge has expired.'; END IF;
  IF (_uid = _c.creator AND _c.creator_score IS NOT NULL)
     OR (_uid = _c.opponent AND _c.opponent_score IS NOT NULL) THEN
    RAISE EXCEPTION 'You''ve already played this challenge.';
  END IF;
  SELECT count(*) INTO _score FROM public.questions q
    WHERE q.id::text = ANY(_c.question_ids)
      AND _answers ->> (q.id::text) = q.correct_option_id;
  IF _uid = _c.creator THEN
    UPDATE public.friend_challenges
      SET creator_answers = _answers, creator_score = _score, creator_seconds = greatest(0, _seconds)
      WHERE id = _id;
  ELSE
    UPDATE public.friend_challenges
      SET opponent_answers = _answers, opponent_score = _score, opponent_seconds = greatest(0, _seconds)
      WHERE id = _id;
  END IF;
  RETURN jsonb_build_object('score', _score, 'total', cardinality(_c.question_ids));
END;
$$;

CREATE OR REPLACE FUNCTION public.list_challenges(_exam text DEFAULT 'neet_pg')
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _out jsonb;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb ORDER BY t.created_at DESC), '[]'::jsonb) INTO _out FROM (
    SELECT
      c.id,
      c.created_at,
      c.expires_at,
      c.question_ids,
      (c.creator = _uid) AS mine,
      COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Friend') AS opponent_name,
      pr.username AS opponent_username,
      cardinality(c.question_ids) AS total,
      CASE WHEN c.creator = _uid THEN c.creator_score ELSE c.opponent_score END AS my_score,
      CASE WHEN c.creator = _uid THEN c.creator_seconds ELSE c.opponent_seconds END AS my_seconds,
      -- Their result stays hidden until you've played.
      CASE WHEN (CASE WHEN c.creator = _uid THEN c.creator_score ELSE c.opponent_score END) IS NULL THEN NULL
           ELSE (CASE WHEN c.creator = _uid THEN c.opponent_score ELSE c.creator_score END) END AS their_score,
      CASE WHEN (CASE WHEN c.creator = _uid THEN c.creator_score ELSE c.opponent_score END) IS NULL THEN NULL
           ELSE (CASE WHEN c.creator = _uid THEN c.opponent_seconds ELSE c.creator_seconds END) END AS their_seconds,
      (CASE WHEN c.creator = _uid THEN c.opponent_score ELSE c.creator_score END) IS NOT NULL AS they_played,
      CASE
        WHEN c.creator_score IS NOT NULL AND c.opponent_score IS NOT NULL THEN 'done'
        WHEN c.expires_at <= now() THEN 'expired'
        WHEN (CASE WHEN c.creator = _uid THEN c.creator_score ELSE c.opponent_score END) IS NULL THEN 'to_play'
        ELSE 'waiting'
      END AS state
    FROM public.friend_challenges c
    LEFT JOIN public.profiles pr ON pr.id = CASE WHEN c.creator = _uid THEN c.opponent ELSE c.creator END
    WHERE c.exam = public.game_valid_exam(_exam) AND (c.creator = _uid OR c.opponent = _uid)
      AND c.created_at > now() - interval '30 days'
    LIMIT 50
  ) t;
  RETURN _out;
END;
$$;

-- ---------- monthly sprint ----------

CREATE TABLE IF NOT EXISTS public.monthly_event_awards (
  exam text NOT NULL,
  month date NOT NULL,
  awarded_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (exam, month)
);
GRANT ALL ON public.monthly_event_awards TO service_role;
ALTER TABLE public.monthly_event_awards ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.get_monthly_event(_exam text DEFAULT 'neet_pg')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _month date := date_trunc('month', now() AT TIME ZONE 'UTC')::date;
  _start timestamptz;
  _end timestamptz;
  _prev date;
  _anon text;
  _top jsonb;
  _me jsonb;
  _n integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  _exam := public.game_valid_exam(_exam);
  _anon := CASE WHEN _exam = 'neet_ug' THEN 'Aspirant' ELSE 'Doctor' END;
  _start := _month::timestamp AT TIME ZONE 'UTC';
  _end := (_month + interval '1 month')::timestamp AT TIME ZONE 'UTC';
  _prev := (_month - interval '1 month')::date;

  -- First call of a new month: badge last month's top 10 (once, under a lock).
  IF NOT EXISTS (SELECT 1 FROM public.monthly_event_awards WHERE exam = _exam AND month = _prev) THEN
    PERFORM pg_advisory_xact_lock(hashtext('sprint:' || _exam || ':' || _prev::text));
    IF NOT EXISTS (SELECT 1 FROM public.monthly_event_awards WHERE exam = _exam AND month = _prev) THEN
      PERFORM public.game_award_badge(w.user_id, _exam, 'sprint_top10')
      FROM (
        SELECT e.user_id, sum(e.amount) AS xp
        FROM public.xp_events e
        LEFT JOIN public.game_profiles gp ON gp.user_id = e.user_id AND gp.exam = _exam
        WHERE e.exam = _exam AND COALESCE(gp.league_opt_out, false) = false
          AND e.created_at >= _prev::timestamp AT TIME ZONE 'UTC' AND e.created_at < _start
        GROUP BY e.user_id HAVING sum(e.amount) > 0
        ORDER BY xp DESC LIMIT 10
      ) w;
      INSERT INTO public.monthly_event_awards (exam, month) VALUES (_exam, _prev) ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  WITH totals AS (
    SELECT e.user_id, sum(e.amount)::integer AS xp
    FROM public.xp_events e
    LEFT JOIN public.game_profiles gp ON gp.user_id = e.user_id AND gp.exam = _exam
    WHERE e.exam = _exam AND e.created_at >= _start AND e.created_at < _end
      AND (COALESCE(gp.league_opt_out, false) = false OR e.user_id = _uid)
    GROUP BY e.user_id HAVING sum(e.amount) > 0
  ), ranked AS (
    SELECT t.user_id, t.xp, rank() OVER (ORDER BY t.xp DESC)::integer AS rank FROM totals t
  )
  SELECT
    (SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'rank', r.rank, 'xp', r.xp, 'is_me', r.user_id = _uid,
        'name', COALESCE(NULLIF(pr.display_name, ''), pr.username, _anon),
        'username', pr.username) ORDER BY r.rank, r.xp DESC), '[]'::jsonb)
      FROM (SELECT * FROM ranked ORDER BY rank LIMIT 50) r
      LEFT JOIN public.profiles pr ON pr.id = r.user_id),
    (SELECT jsonb_build_object('rank', rank, 'xp', xp) FROM ranked WHERE user_id = _uid),
    (SELECT count(*)::integer FROM ranked)
  INTO _top, _me, _n;

  RETURN jsonb_build_object(
    'title', trim(to_char(_month, 'FMMonth')) || ' Sprint',
    'starts_at', _start,
    'ends_at', _end,
    'participants', COALESCE(_n, 0),
    'me', _me,
    'top', _top,
    'reward', 'Top 10 win the Sprint Top 10 badge'
  );
END;
$$;

-- ---------- grants ----------

REVOKE EXECUTE ON FUNCTION public.social_are_friends(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.social_user_by_name(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_username(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.request_friend(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.respond_friend(uuid, boolean) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.remove_friend(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.accept_invite(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_friends(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.create_challenge(text, uuid, text[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.submit_challenge(uuid, jsonb, integer) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.list_challenges(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_monthly_event(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_username(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.request_friend(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.respond_friend(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_friend(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_invite(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_friends(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_challenge(text, uuid, text[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_challenge(uuid, jsonb, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_challenges(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_monthly_event(text) TO authenticated;