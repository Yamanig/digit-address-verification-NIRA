/*
  # Create Core Tables for Digital Address Verification Platform

  1. New Tables
    - `addresses` - Stores digital addresses with PlusCode and NIRA verification
      - `id` (uuid, primary key)
      - `plus_code` (text) - Google Plus Code
      - `latitude`, `longitude` (double precision) - Coordinates
      - `street_address`, `city`, `region`, `country` (text)
      - `verification_status` (text) - pending, verified, rejected
      - `nira_id` (text) - NIRA Somalia ID
      - `verified_at`, `created_at`, `updated_at` (timestamptz)
      - `metadata` (jsonb)
    
    - `workflows` - Stores automation workflows
      - `id` (uuid, primary key)
      - `name`, `description` (text)
      - `workflow_data` (jsonb) - React Flow nodes and edges
      - `status` (text) - draft, active, paused, archived
      - `trigger_type` (text) - manual, webhook, scheduled
      - `is_active` (boolean)
      - `execution_count` (integer)
      - `last_executed_at`, `created_at`, `updated_at` (timestamptz)
    
    - `verification_records` - Tracks verification attempts
      - `id` (uuid, primary key)
      - `address_id` (uuid, foreign key)
      - `verification_type` (text) - nira, manual, automated
      - `status` (text) - pending, success, failed
      - `nira_response` (jsonb)
      - `verified_by`, `notes` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (demo mode)
*/

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plus_code text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  street_address text,
  city text NOT NULL DEFAULT '',
  region text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT 'Somalia',
  verification_status text NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  nira_id text,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_addresses_plus_code ON addresses(plus_code);
CREATE INDEX IF NOT EXISTS idx_addresses_verification_status ON addresses(verification_status);
CREATE INDEX IF NOT EXISTS idx_addresses_created_at ON addresses(created_at DESC);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on addresses" ON addresses FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  workflow_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  trigger_type text NOT NULL DEFAULT 'manual' CHECK (trigger_type IN ('manual', 'webhook', 'scheduled')),
  is_active boolean DEFAULT false,
  execution_count integer DEFAULT 0,
  last_executed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflows_is_active ON workflows(is_active);

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on workflows" ON workflows FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS verification_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address_id uuid NOT NULL REFERENCES addresses(id) ON DELETE CASCADE,
  verification_type text NOT NULL CHECK (verification_type IN ('nira', 'manual', 'automated')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  nira_response jsonb,
  verified_by text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_verification_records_address_id ON verification_records(address_id);
CREATE INDEX IF NOT EXISTS idx_verification_records_status ON verification_records(status);

ALTER TABLE verification_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on verification_records" ON verification_records FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
