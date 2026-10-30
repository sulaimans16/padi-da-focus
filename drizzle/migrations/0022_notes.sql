-- Study notes: a floating notepad students use while studying. Each note can be
-- tagged with what was open (a lesson, a question or a page). Owner-only.

CREATE TABLE IF NOT EXISTS public.study_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam text NOT NULL DEFAULT 'neet_pg' CHECK (exam IN ('neet_pg', 'neet_ug')),
  title text NOT NULL DEFAULT '' CHECK (char_length(title) <= 120),
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 20000),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 80),
  source_kind text NOT NULL DEFAULT 'page' CHECK (source_kind IN ('lesson', 'question', 'page')),
  source_ref text CHECK (source_ref IS NULL OR char_length(source_ref) <= 200),
  source_label text CHECK (source_label IS NULL OR char_length(source_label) <= 160),
  source_path text CHECK (source_path IS NULL OR char_length(source_path) <= 300),
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  -- Set by the client so offline edits merge newest-first across devices.
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS study_notes_user_idx ON public.study_notes (user_id, exam, updated_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_notes TO authenticated;
GRANT ALL ON public.study_notes TO service_role;
ALTER TABLE public.study_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own notes" ON public.study_notes;
CREATE POLICY "Users manage own notes" ON public.study_notes FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Keep one account from filling the table: at most 2000 notes each.
CREATE OR REPLACE FUNCTION public.study_notes_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.study_notes WHERE user_id = NEW.user_id) >= 2000 THEN
    RAISE EXCEPTION 'You have reached the 2000-note limit. Delete some notes to add more.';
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS study_notes_cap ON public.study_notes;
CREATE TRIGGER study_notes_cap BEFORE INSERT ON public.study_notes
  FOR EACH ROW EXECUTE FUNCTION public.study_notes_cap();
