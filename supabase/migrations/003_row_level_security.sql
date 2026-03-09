-- Enable Row Level Security on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_tokens ENABLE ROW LEVEL SECURITY;

-- Companies: Public read access
CREATE POLICY "Public read access for companies"
  ON companies FOR SELECT
  USING (true);

-- Companies: Insert/Update only via service role (handled in API)
CREATE POLICY "Service role insert for companies"
  ON companies FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Service role update for companies"
  ON companies FOR UPDATE
  USING (false);

-- Reviews: Public read only approved reviews
CREATE POLICY "Public read approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

-- Reviews: Insert only via service role (handled in API)
CREATE POLICY "Service role insert for reviews"
  ON reviews FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Service role update for reviews"
  ON reviews FOR UPDATE
  USING (false);

-- Email tokens: No public access (service role only)
CREATE POLICY "No public access for email_tokens"
  ON email_tokens FOR ALL
  USING (false);

-- Note: The service role key bypasses RLS, so all operations
-- from our API routes will work. These policies only affect
-- direct database access using the anon key.
