CREATE TABLE public.questions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject text NOT NULL,
  topic text NOT NULL,
  stem text NOT NULL,
  options jsonb NOT NULL,
  correct_option_id text NOT NULL,
  one_liner text NOT NULL,
  explanation text NOT NULL,
  distractors jsonb NOT NULL DEFAULT '{}'::jsonb,
  high_yield text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'med',
  is_pyq boolean NOT NULL DEFAULT false,
  pyq_year integer,
  repeat_count integer,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX questions_subject_topic_idx ON public.questions (subject, topic);

GRANT SELECT ON public.questions TO anon;
GRANT SELECT ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions are readable by everyone" ON public.questions FOR SELECT USING (true);