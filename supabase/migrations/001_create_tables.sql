-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  domain TEXT,
  logo_url TEXT,
  industry TEXT,
  country TEXT CHECK (country IN ('CA', 'US', 'FR')),
  review_count INTEGER DEFAULT 0,
  avg_overall NUMERIC(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  role_title TEXT,
  role_type TEXT CHECK (role_type IN ('SWE', 'Design', 'Finance', 'Marketing', 'Data', 'Other')),
  year INTEGER NOT NULL,
  season TEXT CHECK (season IN ('Winter', 'Summer', 'Fall')),
  city TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  pay_amount INTEGER,
  pay_type TEXT CHECK (pay_type IN ('hourly', 'monthly', 'stipend', 'unpaid')),
  body TEXT NOT NULL,
  pros TEXT,
  cons TEXT,
  rating_mentorship INTEGER CHECK (rating_mentorship BETWEEN 1 AND 5),
  rating_work_quality INTEGER CHECK (rating_work_quality BETWEEN 1 AND 5),
  rating_culture INTEGER CHECK (rating_culture BETWEEN 1 AND 5),
  rating_compensation INTEGER CHECK (rating_compensation BETWEEN 1 AND 5),
  rating_return_offer INTEGER CHECK (rating_return_offer BETWEEN 1 AND 5),
  would_recommend BOOLEAN DEFAULT TRUE,
  received_offer BOOLEAN,
  school TEXT,
  language TEXT CHECK (language IN ('en', 'fr')) DEFAULT 'en',
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email tokens table (for anonymous auth)
CREATE TABLE email_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_hash TEXT UNIQUE NOT NULL,
  token_hash TEXT UNIQUE NOT NULL,
  used_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Indexes
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_name_trgm ON companies USING GIN (name gin_trgm_ops);
CREATE INDEX idx_reviews_company_status ON reviews(company_id, status);
CREATE INDEX idx_reviews_token_hash ON reviews(token_hash);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_email_tokens_email_hash ON email_tokens(email_hash);
CREATE INDEX idx_email_tokens_token_hash ON email_tokens(token_hash);
