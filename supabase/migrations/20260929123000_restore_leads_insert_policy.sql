/*
  # Restore anonymous lead insert policy

  After project unpause, anon inserts were rejected by RLS even though a
  policy appeared present. Recreate the insert policy explicitly.
*/

DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;

CREATE POLICY "Allow anonymous lead submissions"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
