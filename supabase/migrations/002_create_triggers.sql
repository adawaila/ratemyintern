-- Function to update company stats when a review is approved
CREATE OR REPLACE FUNCTION update_company_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update when status changes to 'approved'
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    UPDATE companies SET
      review_count = (
        SELECT COUNT(*) FROM reviews
        WHERE company_id = NEW.company_id AND status = 'approved'
      ),
      avg_overall = (
        SELECT AVG((rating_mentorship + rating_work_quality + rating_culture + rating_compensation + rating_return_offer) / 5.0)
        FROM reviews
        WHERE company_id = NEW.company_id AND status = 'approved'
      )
    WHERE id = NEW.company_id;
  END IF;

  -- Also update when a review is removed from approved
  IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
    UPDATE companies SET
      review_count = (
        SELECT COUNT(*) FROM reviews
        WHERE company_id = NEW.company_id AND status = 'approved'
      ),
      avg_overall = (
        SELECT AVG((rating_mentorship + rating_work_quality + rating_culture + rating_compensation + rating_return_offer) / 5.0)
        FROM reviews
        WHERE company_id = NEW.company_id AND status = 'approved'
      )
    WHERE id = NEW.company_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating company stats
CREATE TRIGGER trigger_update_company_stats
  AFTER INSERT OR UPDATE OF status ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_company_stats();

-- Function to validate review limit per email
CREATE OR REPLACE FUNCTION validate_review_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  SELECT used_count INTO current_count
  FROM email_tokens
  WHERE token_hash = NEW.token_hash;

  IF current_count >= 3 THEN
    RAISE EXCEPTION 'Review limit reached for this email (max 3 reviews)';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for validating review limit
CREATE TRIGGER trigger_validate_review_limit
  BEFORE INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION validate_review_limit();
