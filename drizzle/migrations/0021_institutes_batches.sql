-- Institutes: coaching institutes run batches of students on the app. Faculty
-- see their batch's progress and set assignments; students join with a code
-- (which can unlock Pro once the institute is verified by an admin).
-- Every table is RPC-only (RLS on, no client policies), like friend_challenges.

-- ---------- tables ----------

CREATE TABLE IF NOT EXISTS public.institutes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  city text NOT NULL DEFAULT '' CHECK (char_length(city) <= 60),
  verified boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.institute_staff (
  institute_id uuid NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'faculty')),
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (institute_id, user_id)
);
CREATE INDEX IF NOT EXISTS institute_staff_user_idx ON public.institute_staff (user_id);

CREATE TABLE IF NOT EXISTS public.batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_id uuid NOT NULL REFERENCES public.institutes(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  exam text NOT NULL DEFAULT 'neet_pg' CHECK (exam IN ('neet_pg', 'neet_ug')),
  join_code text NOT NULL UNIQUE,
  pro_days integer NOT NULL DEFAULT 0 CHECK (pro_days BETWEEN 0 AND 365),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS batches_institute_idx ON public.batches (institute_id);

CREATE TABLE IF NOT EXISTS public.batch_members (
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  pro_granted boolean NOT NULL DEFAULT false,
  PRIMARY KEY (batch_id, user_id)
);
CREATE INDEX IF NOT EXISTS batch_members_user_idx ON public.batch_members (user_id);

CREATE TABLE IF NOT EXISTS public.batch_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 80),
  question_ids text[] NOT NULL,
  due_at timestamptz,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS batch_assignments_batch_idx ON public.batch_assignments (batch_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  assignment_id uuid NOT NULL REFERENCES public.batch_assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL,
  score integer NOT NULL,
  seconds integer NOT NULL DEFAULT 0,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (assignment_id, user_id)
);

GRANT ALL ON public.institutes, public.institute_staff, public.batches, public.batch_members,
  public.batch_assignments, public.assignment_submissions TO service_role;
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

-- ---------- helpers ----------

CREATE OR REPLACE FUNCTION public.is_institute_staff(_institute uuid, _owner_only boolean DEFAULT false)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.institute_staff
    WHERE institute_id = _institute AND user_id = auth.uid()
      AND (NOT _owner_only OR role = 'owner')
  )
$$;

CREATE OR REPLACE FUNCTION public.is_batch_staff(_batch uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.batches b
    JOIN public.institute_staff s ON s.institute_id = b.institute_id
    WHERE b.id = _batch AND s.user_id = auth.uid()
  )
$$;

-- 8 characters without look-alikes (no 0/O, 1/I/L).
CREATE OR REPLACE FUNCTION public.institute_new_code()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  _alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  _code text;
BEGIN
  LOOP
    SELECT string_agg(substr(_alphabet, 1 + floor(random() * length(_alphabet))::int, 1), '')
      INTO _code FROM generate_series(1, 8);
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.batches WHERE join_code = _code);
  END LOOP;
  RETURN _code;
END;
$$;

-- ---------- institute & staff ----------

CREATE OR REPLACE FUNCTION public.create_institute(_name text, _city text DEFAULT '')
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _id uuid;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  IF EXISTS (SELECT 1 FROM public.institute_staff WHERE user_id = _uid AND role = 'owner') THEN
    RAISE EXCEPTION 'You already own an institute.';
  END IF;
  _name := btrim(_name);
  IF char_length(_name) < 2 THEN RAISE EXCEPTION 'Please enter the institute name.'; END IF;
  INSERT INTO public.institutes (name, city, created_by)
    VALUES (left(_name, 80), left(btrim(COALESCE(_city, '')), 60), _uid) RETURNING id INTO _id;
  INSERT INTO public.institute_staff (institute_id, user_id, role) VALUES (_id, _uid, 'owner');
  RETURN _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.add_institute_staff(_institute uuid, _username text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _other uuid;
BEGIN
  IF NOT public.is_institute_staff(_institute, true) THEN RAISE EXCEPTION 'Only the owner can add faculty.'; END IF;
  _other := public.social_user_by_name(_username);
  IF _other IS NULL THEN RAISE EXCEPTION 'No one has that @username.'; END IF;
  INSERT INTO public.institute_staff (institute_id, user_id, role) VALUES (_institute, _other, 'faculty')
    ON CONFLICT (institute_id, user_id) DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_institute_staff(_institute uuid, _user uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_institute_staff(_institute, true) THEN RAISE EXCEPTION 'Only the owner can remove faculty.'; END IF;
  DELETE FROM public.institute_staff WHERE institute_id = _institute AND user_id = _user AND role = 'faculty';
END;
$$;

-- ---------- batches ----------

CREATE OR REPLACE FUNCTION public.create_batch(_institute uuid, _name text, _exam text, _pro_days integer DEFAULT 0)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id uuid;
BEGIN
  IF NOT public.is_institute_staff(_institute) THEN RAISE EXCEPTION 'Only institute staff can create batches.'; END IF;
  IF (SELECT count(*) FROM public.batches WHERE institute_id = _institute) >= 50 THEN
    RAISE EXCEPTION 'An institute can have up to 50 batches.';
  END IF;
  INSERT INTO public.batches (institute_id, name, exam, join_code, pro_days)
    VALUES (_institute, left(btrim(_name), 60), public.game_valid_exam(_exam), public.institute_new_code(),
            least(365, greatest(0, COALESCE(_pro_days, 0))))
    RETURNING id INTO _id;
  RETURN _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_batch(_batch uuid, _active boolean, _rotate_code boolean DEFAULT false)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _code text;
BEGIN
  IF NOT public.is_batch_staff(_batch) THEN RAISE EXCEPTION 'Only institute staff can change batches.'; END IF;
  UPDATE public.batches
    SET active = COALESCE(_active, active),
        join_code = CASE WHEN _rotate_code THEN public.institute_new_code() ELSE join_code END
    WHERE id = _batch RETURNING join_code INTO _code;
  RETURN _code;
END;
$$;

-- What a join link shows before signing in: names only.
CREATE OR REPLACE FUNCTION public.batch_preview(_code text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object('batch', b.name, 'institute', i.name, 'city', i.city, 'exam', b.exam,
                            'verified', i.verified, 'pro_days', CASE WHEN i.verified THEN b.pro_days ELSE 0 END)
  FROM public.batches b JOIN public.institutes i ON i.id = b.institute_id
  WHERE b.join_code = upper(btrim(_code)) AND b.active
$$;

CREATE OR REPLACE FUNCTION public.join_batch(_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _b public.batches;
  _verified boolean;
  _granted boolean := false;
  _new boolean;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT * INTO _b FROM public.batches WHERE join_code = upper(btrim(_code)) AND active;
  IF _b.id IS NULL THEN RAISE EXCEPTION 'That batch code isn''t valid.'; END IF;
  SELECT verified INTO _verified FROM public.institutes WHERE id = _b.institute_id;
  INSERT INTO public.batch_members (batch_id, user_id) VALUES (_b.id, _uid)
    ON CONFLICT (batch_id, user_id) DO NOTHING;
  _new := FOUND;
  -- Pro once per student per batch, and only from verified institutes.
  IF _verified AND _b.pro_days > 0 THEN
    UPDATE public.batch_members SET pro_granted = true
      WHERE batch_id = _b.id AND user_id = _uid AND NOT pro_granted;
    IF FOUND THEN
      PERFORM public.grant_pro_days(_uid, _b.pro_days, 'batch:' || _b.id);
      _granted := true;
    END IF;
  END IF;
  RETURN jsonb_build_object('batch_id', _b.id, 'exam', _b.exam, 'joined', _new,
                            'pro_days', CASE WHEN _granted THEN _b.pro_days ELSE 0 END);
END;
$$;

CREATE OR REPLACE FUNCTION public.leave_batch(_batch uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.batch_members WHERE batch_id = _batch AND user_id = auth.uid()
$$;

-- ---------- student view ----------

CREATE OR REPLACE FUNCTION public.my_batches(_exam text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _week timestamptz := date_trunc('week', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  RETURN COALESCE((
    SELECT jsonb_agg(jsonb_build_object(
      'id', b.id, 'name', b.name, 'exam', b.exam, 'institute', i.name, 'city', i.city,
      'verified', i.verified, 'joined_at', m.joined_at,
      'members', (SELECT count(*) FROM public.batch_members x WHERE x.batch_id = b.id),
      'assignments', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
          'id', a.id, 'title', a.title, 'due_at', a.due_at, 'created_at', a.created_at,
          'question_ids', a.question_ids, 'total', cardinality(a.question_ids),
          'my_score', s.score, 'my_seconds', s.seconds,
          'avg_score', (SELECT round(avg(z.score)::numeric, 1) FROM public.assignment_submissions z WHERE z.assignment_id = a.id),
          'submissions', (SELECT count(*) FROM public.assignment_submissions z WHERE z.assignment_id = a.id)
        ) ORDER BY a.created_at DESC)
        FROM public.batch_assignments a
        LEFT JOIN public.assignment_submissions s ON s.assignment_id = a.id AND s.user_id = _uid
        WHERE a.batch_id = b.id), '[]'::jsonb),
      'leaderboard', COALESCE((
        SELECT jsonb_agg(jsonb_build_object('rank', r.rank, 'name', r.name, 'username', r.username,
                                            'xp', r.xp, 'is_me', r.user_id = _uid) ORDER BY r.rank)
        FROM (
          SELECT x.user_id, pr.username,
                 COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Student') AS name,
                 COALESCE((SELECT sum(e.amount) FROM public.xp_events e
                   WHERE e.user_id = x.user_id AND e.exam = b.exam AND e.created_at >= _week), 0)::integer AS xp,
                 rank() OVER (ORDER BY COALESCE((SELECT sum(e.amount) FROM public.xp_events e
                   WHERE e.user_id = x.user_id AND e.exam = b.exam AND e.created_at >= _week), 0) DESC) AS rank
          FROM public.batch_members x LEFT JOIN public.profiles pr ON pr.id = x.user_id
          WHERE x.batch_id = b.id
        ) r WHERE r.rank <= 20 OR r.user_id = _uid), '[]'::jsonb)
    ) ORDER BY m.joined_at DESC)
    FROM public.batch_members m
    JOIN public.batches b ON b.id = m.batch_id
    JOIN public.institutes i ON i.id = b.institute_id
    WHERE m.user_id = _uid AND (_exam IS NULL OR b.exam = _exam)
  ), '[]'::jsonb);
END;
$$;

-- ---------- staff view ----------

CREATE OR REPLACE FUNCTION public.staff_overview()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  RETURN COALESCE((
    SELECT jsonb_agg(jsonb_build_object(
      'id', i.id, 'name', i.name, 'city', i.city, 'verified', i.verified, 'role', s.role,
      'staff', (SELECT COALESCE(jsonb_agg(jsonb_build_object(
                  'user_id', st.user_id, 'role', st.role, 'username', pr.username,
                  'name', COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Staff')) ORDER BY st.role DESC, st.added_at), '[]'::jsonb)
                FROM public.institute_staff st LEFT JOIN public.profiles pr ON pr.id = st.user_id
                WHERE st.institute_id = i.id),
      'batches', (SELECT COALESCE(jsonb_agg(jsonb_build_object(
                  'id', b.id, 'name', b.name, 'exam', b.exam, 'join_code', b.join_code,
                  'pro_days', b.pro_days, 'active', b.active, 'created_at', b.created_at,
                  'members', (SELECT count(*) FROM public.batch_members m WHERE m.batch_id = b.id),
                  'assignments', (SELECT count(*) FROM public.batch_assignments a WHERE a.batch_id = b.id)
                ) ORDER BY b.created_at DESC), '[]'::jsonb)
                FROM public.batches b WHERE b.institute_id = i.id)
    ) ORDER BY i.created_at)
    FROM public.institute_staff s JOIN public.institutes i ON i.id = s.institute_id
    WHERE s.user_id = _uid
  ), '[]'::jsonb);
END;
$$;

-- Progress of one batch on its exam. Only members of the batch, only this exam.
CREATE OR REPLACE FUNCTION public.batch_dashboard(_batch uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _b public.batches;
  _week timestamptz := date_trunc('week', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
  _today date := (now() AT TIME ZONE 'UTC')::date;
  _n_assign integer;
BEGIN
  IF NOT public.is_batch_staff(_batch) THEN RAISE EXCEPTION 'Only institute staff can see this batch.'; END IF;
  SELECT * INTO _b FROM public.batches WHERE id = _batch;
  SELECT count(*) INTO _n_assign FROM public.batch_assignments WHERE batch_id = _batch;
  RETURN jsonb_build_object(
    'batch', jsonb_build_object('id', _b.id, 'name', _b.name, 'exam', _b.exam, 'join_code', _b.join_code,
                                'pro_days', _b.pro_days, 'active', _b.active),
    'assignments_total', _n_assign,
    'students', COALESCE((
      SELECT jsonb_agg(row_to_json(t)::jsonb ORDER BY t.name)
      FROM (
        SELECT m.user_id, pr.username,
               COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Student') AS name,
               m.joined_at,
               (SELECT max(a.created_at) FROM public.attempts a WHERE a.user_id = m.user_id AND a.exam = _b.exam) AS last_active,
               (SELECT count(*) FROM public.attempts a WHERE a.user_id = m.user_id AND a.exam = _b.exam
                  AND a.created_at >= now() - interval '7 days')::integer AS q7,
               (SELECT count(*) FROM public.attempts a WHERE a.user_id = m.user_id AND a.exam = _b.exam
                  AND a.created_at >= now() - interval '30 days')::integer AS q30,
               (SELECT round(avg(CASE WHEN a.correct THEN 1 ELSE 0 END)::numeric, 3) FROM public.attempts a
                  WHERE a.user_id = m.user_id AND a.exam = _b.exam AND a.created_at >= now() - interval '30 days') AS accuracy30,
               COALESCE((SELECT CASE WHEN gp.last_streak_day >= _today - 1 THEN gp.streak ELSE 0 END
                  FROM public.game_profiles gp WHERE gp.user_id = m.user_id AND gp.exam = _b.exam), 0) AS streak,
               COALESCE((SELECT sum(e.amount) FROM public.xp_events e
                  WHERE e.user_id = m.user_id AND e.exam = _b.exam AND e.created_at >= _week), 0)::integer AS week_xp,
               (SELECT count(*) FROM public.assignment_submissions s JOIN public.batch_assignments a ON a.id = s.assignment_id
                  WHERE a.batch_id = _batch AND s.user_id = m.user_id)::integer AS assignments_done
        FROM public.batch_members m LEFT JOIN public.profiles pr ON pr.id = m.user_id
        WHERE m.batch_id = _batch
      ) t), '[]'::jsonb),
    'weak_topics', COALESCE((
      SELECT jsonb_agg(row_to_json(w)::jsonb ORDER BY w.accuracy, w.attempts DESC)
      FROM (
        SELECT a.subject, COALESCE(NULLIF(btrim(a.topic), ''), 'General') AS topic,
               count(*)::integer AS attempts, count(DISTINCT a.user_id)::integer AS students,
               round(avg(CASE WHEN a.correct THEN 1 ELSE 0 END)::numeric, 3) AS accuracy
        FROM public.attempts a JOIN public.batch_members m ON m.user_id = a.user_id AND m.batch_id = _batch
        WHERE a.exam = _b.exam AND a.created_at >= now() - interval '60 days'
        GROUP BY 1, 2 HAVING count(*) >= 10
        ORDER BY accuracy, attempts DESC LIMIT 10
      ) w), '[]'::jsonb),
    'subjects', COALESCE((
      SELECT jsonb_agg(row_to_json(s)::jsonb ORDER BY s.accuracy)
      FROM (
        SELECT a.subject, count(*)::integer AS attempts,
               round(avg(CASE WHEN a.correct THEN 1 ELSE 0 END)::numeric, 3) AS accuracy
        FROM public.attempts a JOIN public.batch_members m ON m.user_id = a.user_id AND m.batch_id = _batch
        WHERE a.exam = _b.exam AND a.created_at >= now() - interval '60 days'
        GROUP BY 1
      ) s), '[]'::jsonb),
    'activity', (
      SELECT jsonb_agg(jsonb_build_object('day', d.day::date, 'active', COALESCE(c.n, 0), 'questions', COALESCE(c.q, 0)) ORDER BY d.day)
      FROM generate_series(_today - 29, _today, interval '1 day') AS d(day)
      LEFT JOIN (
        SELECT (a.created_at AT TIME ZONE 'UTC')::date AS day, count(DISTINCT a.user_id)::integer AS n, count(*)::integer AS q
        FROM public.attempts a JOIN public.batch_members m ON m.user_id = a.user_id AND m.batch_id = _batch
        WHERE a.exam = _b.exam AND a.created_at >= (_today - 29)::timestamp AT TIME ZONE 'UTC'
        GROUP BY 1
      ) c ON c.day = d.day::date
    ),
    'assignments', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', a.id, 'title', a.title, 'due_at', a.due_at, 'created_at', a.created_at,
        'total', cardinality(a.question_ids),
        'submissions', (SELECT count(*) FROM public.assignment_submissions s WHERE s.assignment_id = a.id),
        'avg_score', (SELECT round(avg(s.score)::numeric, 1) FROM public.assignment_submissions s WHERE s.assignment_id = a.id)
      ) ORDER BY a.created_at DESC)
      FROM public.batch_assignments a WHERE a.batch_id = _batch), '[]'::jsonb)
  );
END;
$$;

-- ---------- assignments ----------

CREATE OR REPLACE FUNCTION public.create_assignment(_batch uuid, _title text, _question_ids text[], _due_at timestamptz DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _exam text;
  _valid integer;
  _id uuid;
BEGIN
  IF NOT public.is_batch_staff(_batch) THEN RAISE EXCEPTION 'Only institute staff can set assignments.'; END IF;
  SELECT exam INTO _exam FROM public.batches WHERE id = _batch;
  SELECT count(DISTINCT q.id) INTO _valid FROM public.questions q
    WHERE q.id::text = ANY(_question_ids) AND q.exam = _exam;
  IF _valid < 5 OR _valid > 50 OR _valid <> cardinality(_question_ids) THEN
    RAISE EXCEPTION 'An assignment needs 5–50 questions from this exam''s bank.';
  END IF;
  INSERT INTO public.batch_assignments (batch_id, title, question_ids, due_at, created_by)
    VALUES (_batch, left(btrim(_title), 80), _question_ids, _due_at, auth.uid()) RETURNING id INTO _id;
  RETURN _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_assignment(_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _batch uuid;
BEGIN
  SELECT batch_id INTO _batch FROM public.batch_assignments WHERE id = _id;
  IF _batch IS NULL OR NOT public.is_batch_staff(_batch) THEN RAISE EXCEPTION 'Assignment not found.'; END IF;
  DELETE FROM public.batch_assignments WHERE id = _id;
END;
$$;

-- Graded on the server; the first submission counts.
CREATE OR REPLACE FUNCTION public.submit_assignment(_id uuid, _answers jsonb, _seconds integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _a public.batch_assignments;
  _score integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'not signed in'; END IF;
  SELECT * INTO _a FROM public.batch_assignments WHERE id = _id;
  IF _a.id IS NULL OR NOT EXISTS (SELECT 1 FROM public.batch_members WHERE batch_id = _a.batch_id AND user_id = _uid) THEN
    RAISE EXCEPTION 'Assignment not found.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.assignment_submissions WHERE assignment_id = _id AND user_id = _uid) THEN
    RAISE EXCEPTION 'You''ve already submitted this assignment.';
  END IF;
  SELECT count(*) INTO _score FROM public.questions q
    WHERE q.id::text = ANY(_a.question_ids) AND _answers ->> (q.id::text) = q.correct_option_id;
  INSERT INTO public.assignment_submissions (assignment_id, user_id, answers, score, seconds)
    VALUES (_id, _uid, COALESCE(_answers, '{}'::jsonb), _score, greatest(0, COALESCE(_seconds, 0)));
  RETURN jsonb_build_object('score', _score, 'total', cardinality(_a.question_ids));
END;
$$;

CREATE OR REPLACE FUNCTION public.assignment_results(_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _a public.batch_assignments;
BEGIN
  SELECT * INTO _a FROM public.batch_assignments WHERE id = _id;
  IF _a.id IS NULL OR NOT public.is_batch_staff(_a.batch_id) THEN RAISE EXCEPTION 'Assignment not found.'; END IF;
  RETURN jsonb_build_object(
    'id', _a.id, 'title', _a.title, 'due_at', _a.due_at, 'total', cardinality(_a.question_ids),
    'students', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'user_id', m.user_id, 'username', pr.username,
        'name', COALESCE(NULLIF(pr.display_name, ''), pr.username, 'Student'),
        'score', s.score, 'seconds', s.seconds, 'submitted_at', s.submitted_at
      ) ORDER BY s.score DESC NULLS LAST, s.seconds, pr.display_name)
      FROM public.batch_members m
      LEFT JOIN public.profiles pr ON pr.id = m.user_id
      LEFT JOIN public.assignment_submissions s ON s.assignment_id = _id AND s.user_id = m.user_id
      WHERE m.batch_id = _a.batch_id), '[]'::jsonb),
    'questions', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'id', q.id, 'stem', left(q.stem, 160), 'topic', q.topic, 'subject', q.subject,
        'answered', (SELECT count(*) FROM public.assignment_submissions s WHERE s.assignment_id = _id AND s.answers ? q.id::text),
        'correct', (SELECT count(*) FROM public.assignment_submissions s
                    WHERE s.assignment_id = _id AND s.answers ->> (q.id::text) = q.correct_option_id)
      ) ORDER BY array_position(_a.question_ids, q.id::text))
      FROM public.questions q WHERE q.id::text = ANY(_a.question_ids)), '[]'::jsonb)
  );
END;
$$;

-- ---------- admin ----------

CREATE OR REPLACE FUNCTION public.admin_list_institutes()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Admins only.'; END IF;
  RETURN COALESCE((
    SELECT jsonb_agg(jsonb_build_object(
      'id', i.id, 'name', i.name, 'city', i.city, 'verified', i.verified, 'created_at', i.created_at,
      'owner', (SELECT COALESCE(NULLIF(pr.display_name, ''), pr.username) FROM public.profiles pr WHERE pr.id = i.created_by),
      'owner_email', (SELECT u.email FROM auth.users u WHERE u.id = i.created_by),
      'batches', (SELECT count(*) FROM public.batches b WHERE b.institute_id = i.id),
      'students', (SELECT count(DISTINCT m.user_id) FROM public.batch_members m
                     JOIN public.batches b ON b.id = m.batch_id WHERE b.institute_id = i.id)
    ) ORDER BY i.verified, i.created_at DESC)
    FROM public.institutes i
  ), '[]'::jsonb);
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_verify_institute(_id uuid, _verified boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Admins only.'; END IF;
  UPDATE public.institutes SET verified = _verified WHERE id = _id;
END;
$$;

-- ---------- grants ----------

REVOKE ALL ON FUNCTION public.institute_new_code() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_institute_staff(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_batch_staff(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_institute(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_institute_staff(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_institute_staff(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_batch(uuid, text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_batch(uuid, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.batch_preview(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.join_batch(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.leave_batch(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_batches(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.staff_overview() TO authenticated;
GRANT EXECUTE ON FUNCTION public.batch_dashboard(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_assignment(uuid, text, text[], timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_assignment(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_assignment(uuid, jsonb, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assignment_results(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_institutes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_verify_institute(uuid, boolean) TO authenticated;
