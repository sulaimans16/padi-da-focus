-- AI study roadmaps synced to the account, per exam track (localStorage stays the guest/offline cache).
CREATE TABLE IF NOT EXISTS public.study_roadmaps (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam text NOT NULL DEFAULT 'neet_pg' CHECK (exam IN ('neet_pg', 'neet_ug')),
  goal_key text NOT NULL,
  goal text NOT NULL,
  roadmap jsonb NOT NULL,
  done text[] NOT NULL DEFAULT '{}',
  opened_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam, goal_key)
);
CREATE INDEX IF NOT EXISTS study_roadmaps_opened_idx ON public.study_roadmaps (user_id, exam, opened_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_roadmaps TO authenticated;
GRANT ALL ON public.study_roadmaps TO service_role;
ALTER TABLE public.study_roadmaps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own roadmaps" ON public.study_roadmaps;
CREATE POLICY "Users manage own roadmaps" ON public.study_roadmaps FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);