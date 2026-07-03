-- ============================================================
-- DURA SCHOOLS — Complete Database Schema
-- Run once in Supabase SQL Editor
-- ============================================================

-- 1. SCHOOLS (one row per school = one tenant)
CREATE TABLE IF NOT EXISTS schools (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  city        TEXT,
  region      TEXT,
  logo_url    TEXT,
  cover_url   TEXT,
  email       TEXT,
  phone       TEXT,
  about       TEXT,
  is_active   BOOLEAN DEFAULT true,
  modules     JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES (extends Supabase auth.users with role + school)
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  school_id   UUID REFERENCES schools(id),
  role        TEXT CHECK (role IN ('super_admin','school_admin','teacher','parent','student')),
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 3. STUDENTS
CREATE TABLE IF NOT EXISTS students (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id        UUID REFERENCES schools(id) NOT NULL,
  profile_id       UUID REFERENCES profiles(id),
  student_number   TEXT,
  full_name        TEXT NOT NULL,
  gender           TEXT,
  date_of_birth    DATE,
  grade            TEXT,
  section          TEXT,
  dorm_room        TEXT,
  parent_id        UUID REFERENCES profiles(id),
  enrollment_date  DATE,
  status           TEXT DEFAULT 'active',
  photo_url        TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id   UUID REFERENCES schools(id) NOT NULL,
  name        TEXT NOT NULL,
  code        TEXT,
  grade       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ADMISSIONS APPLICATIONS (submitted from public website, no login required)
CREATE TABLE IF NOT EXISTS applications (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id            UUID REFERENCES schools(id) NOT NULL,
  applicant_name       TEXT NOT NULL,
  applicant_dob        DATE,
  applicant_gender     TEXT,
  grade_applying_for   TEXT NOT NULL,
  parent_name          TEXT NOT NULL,
  parent_phone         TEXT NOT NULL,
  parent_email         TEXT,
  previous_school      TEXT,
  address              TEXT,
  notes                TEXT,
  status               TEXT DEFAULT 'pending'
                       CHECK (status IN ('pending','reviewing','accepted','rejected')),
  reviewed_by          UUID REFERENCES profiles(id),
  reviewed_at          TIMESTAMPTZ,
  submitted_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id    UUID REFERENCES schools(id) NOT NULL,
  student_id   UUID REFERENCES students(id) NOT NULL,
  subject_id   UUID REFERENCES subjects(id),
  date         DATE NOT NULL,
  status       TEXT DEFAULT 'present'
               CHECK (status IN ('present','absent','late','excused')),
  recorded_by  UUID REFERENCES profiles(id),
  recorded_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GRADES
CREATE TABLE IF NOT EXISTS grades (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id        UUID REFERENCES schools(id) NOT NULL,
  student_id       UUID REFERENCES students(id) NOT NULL,
  subject_id       UUID REFERENCES subjects(id) NOT NULL,
  assessment_type  TEXT CHECK (assessment_type IN ('quiz','midterm','final','assignment','project')),
  score            NUMERIC(5,2),
  max_score        NUMERIC(5,2) DEFAULT 100,
  term             TEXT,
  academic_year    TEXT,
  entered_by       UUID REFERENCES profiles(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id        UUID REFERENCES schools(id) NOT NULL,
  title            TEXT NOT NULL,
  body             TEXT NOT NULL,
  target_audience  TEXT DEFAULT 'all'
                   CHECK (target_audience IN ('all','parents','teachers','students')),
  created_by       UUID REFERENCES profiles(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS (bell icon)
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) NOT NULL,
  school_id   UUID REFERENCES schools(id),
  title       TEXT NOT NULL,
  message     TEXT,
  link        TEXT,
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MESSAGES (parent ↔ teacher)
CREATE TABLE IF NOT EXISTS messages (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id    UUID REFERENCES schools(id) NOT NULL,
  sender_id    UUID REFERENCES profiles(id) NOT NULL,
  receiver_id  UUID REFERENCES profiles(id) NOT NULL,
  subject      TEXT,
  body         TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 11. DORM ROOMS
CREATE TABLE IF NOT EXISTS dorm_rooms (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id    UUID REFERENCES schools(id) NOT NULL,
  room_number  TEXT NOT NULL,
  dorm_block   TEXT,
  floor        INTEGER,
  capacity     INTEGER DEFAULT 4,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY — Multi-tenant data isolation
-- ============================================================

ALTER TABLE schools        ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE students       ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance     ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades         ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE dorm_rooms     ENABLE ROW LEVEL SECURITY;

-- Public can view active schools (needed for school directory page)
CREATE POLICY "public_view_schools" ON schools
  FOR SELECT USING (is_active = true);

-- Public can submit applications (no login needed)
CREATE POLICY "public_submit_applications" ON applications
  FOR INSERT WITH CHECK (true);

-- School data: users only see their own school's data
CREATE POLICY "school_isolation_students"      ON students      USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_subjects"      ON subjects      USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_applications"  ON applications  USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_attendance"    ON attendance    USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_grades"        ON grades        USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_announcements" ON announcements USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));
CREATE POLICY "school_isolation_dorm_rooms"    ON dorm_rooms    USING (school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));

-- Profiles: own profile or same school
CREATE POLICY "profiles_own_or_school" ON profiles
  USING (id = auth.uid() OR school_id = (SELECT school_id FROM profiles WHERE id = auth.uid()));

-- Notifications: own only
CREATE POLICY "own_notifications" ON notifications
  USING (user_id = auth.uid());

-- Messages: sender or receiver
CREATE POLICY "own_messages" ON messages
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

