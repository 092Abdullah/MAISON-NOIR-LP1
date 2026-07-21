/*
# Create inquiries table for landing-page contact form

1. Purpose
- Stores contact-form submissions from the Maison Noir landing page.
- This is a no-auth marketing site (no sign-in screen), so the anon-key
  frontend client must be able to INSERT new inquiries. Reads are not
  needed from the frontend — the studio reviews submissions server-side.

2. New Tables
- `inquiries`
  - `id`          uuid, primary key, default gen_random_uuid()
  - `name`        text, not null — submitter's full name
  - `email`       text, not null — submitter's contact email
  - `project_type` text, nullable — optional category (residential, commercial, etc.)
  - `budget`      text, nullable — optional budget range selected on the form
  - `message`     text, not null — the body of the inquiry
  - `created_at`  timestamptz, default now() — when the inquiry was submitted
  - `status`      text, default 'new' — triage state for the studio

3. Indexes
- `inquiries_created_at_idx` on `created_at DESC` for reviewing newest first.

4. Security (RLS)
- Enable RLS on `inquiries`.
- INSERT policy for `anon, authenticated` (public landing page can submit).
  WITH CHECK (true) because any visitor may submit a contact inquiry — this
  is intentionally public write access, documented here.
- No SELECT/UPDATE/DELETE policy for anon — only the service role
  (server-side, bypasses RLS) can read and manage inquiries.

5. Notes
- Safe to re-run: uses IF NOT EXISTS and drops policies before recreating.
- No user_id / auth.users reference — this is a single-tenant marketing table.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text,
  budget text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx
  ON inquiries (created_at DESC);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
