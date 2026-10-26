-- Migration: 0001_initial_schema.sql
-- Purpose: Create core tables for JourneyOS
-- Author: JourneyOS Team
-- Version: 1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============ Profiles Table ============
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar UNIQUE,
  full_name varchar,
  avatar_url text,
  role varchar NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'student', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_email ON profiles (email) WHERE email IS NOT NULL;

-- ============ ParentStudentRelationships Table ============
CREATE TABLE parent_student_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_parent_student UNIQUE (parent_id, student_id)
);

CREATE INDEX idx_pstr_parent ON parent_student_relationships (parent_id);
CREATE INDEX idx_pstr_student ON parent_student_relationships (student_id);

-- ============ Destinations Table ============
CREATE TABLE destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  country varchar NOT NULL,
  description text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_destinations_country ON destinations (country);
CREATE UNIQUE INDEX idx_destinations_name_country ON destinations (name, country);

-- ============ Programmes Table ============
CREATE TABLE programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  description text,
  destination_id uuid REFERENCES destinations(id) ON DELETE SET NULL,
  duration_weeks int NOT NULL CHECK (duration_weeks > 0 AND duration_weeks <= 52),
  age_min int NOT NULL CHECK (age_min >= 0 AND age_min <= 100),
  age_max int NOT NULL CHECK (age_max >= 0 AND age_max <= 100),
  price_cents bigint NOT NULL CHECK (price_cents > 0),
  currency char(3) NOT NULL,
  availability int NOT NULL DEFAULT 0 CHECK (availability >= 0),
  start_date date NOT NULL,
  end_date date NOT NULL,
  learning_outcomes jsonb NOT NULL DEFAULT '[]',
  what_included jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chk_dates CHECK (end_date >= start_date),
  CONSTRAINT chk_age_range CHECK (age_max >= age_min)
);

CREATE INDEX idx_programmes_destination ON programmes (destination_id);
CREATE INDEX idx_programmes_start_date ON programmes (start_date);
CREATE INDEX idx_programmes_created_at ON programmes (created_at DESC);
CREATE INDEX idx_programmes_title ON programmes USING gin (to_tsvector('english', title));
CREATE INDEX idx_programmes_learning_outcomes ON programmes USING gin (learning_outcomes);

-- ============ ItineraryItems Table ============
CREATE TABLE itinerary_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id uuid NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  day_number int NOT NULL CHECK (day_number >= 1),
  title varchar NOT NULL,
  description text,
  activities jsonb NOT NULL DEFAULT '[]'
);

CREATE INDEX idx_itinerary_programme ON itinerary_items (programme_id);
CREATE INDEX idx_itinerary_day ON itinerary_items (programme_id, day_number);

-- ============ Registrations Table ============
CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  programme_id uuid NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status varchar NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status varchar NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  amount_cents bigint NOT NULL,
  currency char(3) NOT NULL,
  razorpay_order_id varchar,
  razorpay_payment_id varchar,
  razorpay_signature varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT chk_payment_amount CHECK (amount_cents > 0)
);

CREATE INDEX idx_registrations_user ON registrations (user_id);
CREATE INDEX idx_registrations_programme ON registrations (programme_id);
CREATE INDEX idx_registrations_student ON registrations (student_id);
CREATE INDEX idx_registrations_status ON registrations (status);

-- ============ Announcements Table ============
CREATE TABLE announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  content text NOT NULL,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_announcements_created ON announcements (created_at DESC);

-- ============ AnnouncementRecipients Table ============
CREATE TABLE announcement_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id uuid NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_ann_recip UNIQUE (announcement_id, user_id)
);

CREATE INDEX idx_annrecip_user ON announcement_recipients (user_id);
CREATE INDEX idx_annrecip_announcement ON announcement_recipients (announcement_id);

-- ============ PaymentOrders Table ============
CREATE TABLE payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  registration_id uuid REFERENCES registrations(id) ON DELETE SET NULL,
  amount_cents bigint NOT NULL,
  currency char(3) NOT NULL,
  status varchar NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  razorpay_order_id varchar NOT NULL,
  razorpay_payment_id varchar,
  razorpay_signature varchar,
  attempts int NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_payorders_user ON payment_orders (user_id);
CREATE INDEX idx_payorders_registration ON payment_orders (registration_id);
CREATE INDEX idx_payorders_status ON payment_orders (status);

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;