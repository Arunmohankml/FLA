-- ============================================
-- CERTIFICATE GENERATOR SETUP
-- Run these in Supabase SQL Editor
-- ============================================

-- 1. Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  course_level TEXT,
  course_name TEXT,
  grade TEXT,
  total_score TEXT,
  image_url TEXT, -- Cloudinary PDF URL
  form_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 1b. Add form_data column if table already exists
DO $$ BEGIN
  ALTER TABLE certificates ADD COLUMN form_data JSONB;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 1c. Store admin-configurable certificate layout.
-- Used by /api/certificates/layout. Serverless deployments cannot write
-- calibration changes back into src/lib/certificateLayout.ts.
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable RLS (optional, but recommended)
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 3. Allow admin reads (adjust policy as needed)
CREATE POLICY "Allow admin read certificates"
  ON certificates FOR SELECT
  USING (true);

-- 4. Allow admin inserts (adjust policy as needed)
CREATE POLICY "Allow admin insert certificates"
  ON certificates FOR INSERT
  WITH CHECK (true);

-- 4b. Allow admin updates (for regeneration)
CREATE POLICY "Allow admin update certificates"
  ON certificates FOR UPDATE
  USING (true);

-- 5. Certificate PDFs are uploaded to Cloudinary.
-- Add these server-only environment variables in local/deployment config:
-- CLOUDINARY_CLOUD_NAME
-- CLOUDINARY_API_KEY
-- CLOUDINARY_API_SECRET
