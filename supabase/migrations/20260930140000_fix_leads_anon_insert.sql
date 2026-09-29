/*
  # Fix anonymous leads insert (RLS + grants)

  Contact form inserts were rejected with 42501 despite an insert policy
  existing in migration history. Recreate policy for anon+authenticated
  and ensure table INSERT grants.
*/

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.leads TO anon, authenticated;

DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;

CREATE POLICY "Allow anonymous lead submissions"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
