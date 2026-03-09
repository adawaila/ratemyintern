-- =============================================================================
-- RateMyIntern — Seed Data
-- 17 reviews across 12 companies
-- Run this once in the Supabase SQL Editor to populate the site.
-- The trigger on reviews will auto-update company stats (review_count, avg_overall).
-- =============================================================================

DO $$
DECLARE
  v_google UUID;
  v_shopify UUID;
  v_desjardins UUID;
  v_microsoft UUID;
  v_ubisoft UUID;
  v_nbc UUID;
  v_amazon UUID;
  v_cgi UUID;
  v_bell UUID;
  v_bombardier UUID;
  v_sap UUID;
  v_td UUID;
BEGIN

  -- =========== COMPANIES ===========

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Google', 'google', 'google.com', 'Technology', 'US', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_google;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Shopify', 'shopify', 'shopify.com', 'E-commerce', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_shopify;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Desjardins', 'desjardins', 'desjardins.com', 'Finance', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_desjardins;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Microsoft', 'microsoft', 'microsoft.com', 'Technology', 'US', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_microsoft;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Ubisoft', 'ubisoft', 'ubisoft.com', 'Gaming', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_ubisoft;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('National Bank of Canada', 'national-bank-of-canada', 'nbc.ca', 'Finance', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_nbc;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Amazon', 'amazon', 'amazon.com', 'Technology', 'US', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_amazon;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('CGI', 'cgi', 'cgi.com', 'Consulting', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_cgi;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Bell', 'bell', 'bell.ca', 'Telecommunications', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_bell;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('Bombardier', 'bombardier', 'bombardier.com', 'Aerospace', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_bombardier;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('SAP', 'sap', 'sap.com', 'Technology', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_sap;

  INSERT INTO companies (name, slug, domain, industry, country, review_count, avg_overall)
  VALUES ('TD Bank', 'td-bank', 'td.com', 'Finance', 'CA', 0, NULL)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_td;

  -- =========== REVIEWS ===========

  -- 1. Google — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_google, 'seed_review_01', 'Software Engineering Intern', 'SWE', 2025, 'Summer',
    'Mountain View', false, 62, 'hourly',
    'Incredible experience from start to finish. My host was genuinely invested in my growth and set up weekly 1-on-1s with senior engineers. I shipped a feature to production that serves millions of users. The intern programming (tech talks, social events, trips) was world-class. The only downside is the imposter syndrome you feel surrounded by so much talent, but everyone was supportive.',
    'World-class mentorship, real impact on products, amazing intern programming, free food',
    'Can feel overwhelming at first, Bay Area cost of living is brutal even with the stipend',
    5, 5, 5, 5, 5, true, true, 'University of Waterloo', 'en', 'approved', 3,
    NOW() - INTERVAL '2 days'
  );

  -- 2. Google — Data Intern — Fall 2024
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_google, 'seed_review_02', 'Data Science Intern', 'Data', 2024, 'Fall',
    'Montreal', false, 55, 'hourly',
    'The Montreal office is smaller and cozier than the US campuses, which I actually preferred. My project involved building ML pipelines for internal tooling. The technical bar is high but the team was patient. Got great feedback during my performance review and learned more about production ML in 4 months than in two years of coursework.',
    'Strong technical environment, great ML infrastructure, Montreal office has a nice vibe',
    'Fall intern cohort is much smaller so fewer social events compared to summer',
    4, 4, 5, 4, 4, true, true, 'McGill University', 'en', 'approved', 1,
    NOW() - INTERVAL '3 weeks'
  );

  -- 3. Shopify — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_shopify, 'seed_review_03', 'Backend Developer Intern', 'SWE', 2025, 'Summer',
    'Ottawa', false, 42, 'hourly',
    'Shopify treats interns like full-time developers from day one. I had my first PR merged within the first week. The Dev Degree program alumni who mentored me were fantastic. I worked on the checkout flow which processes billions in GMV. The culture of shipping fast and iterating is addictive. Highly recommend if you want to grow rapidly as an engineer.',
    'Ship real code fast, amazing developer culture, impactful work, great mentors',
    'Pace can be intense, Ruby on Rails isn''t everyone''s cup of tea',
    5, 5, 5, 4, 5, true, true, 'Carleton University', 'en', 'approved', 5,
    NOW() - INTERVAL '5 days'
  );

  -- 4. Shopify — Design Intern — Winter 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_shopify, 'seed_review_04', 'Product Design Intern', 'Design', 2025, 'Winter',
    'Toronto', true, 38, 'hourly',
    'The design team at Shopify is honestly world-class. I got to work on merchant-facing features and participate in design critiques with senior designers. Being remote was a bit challenging for collaboration but they have great async workflows. The Figma libraries and design systems are incredibly well-organized. Would have loved more in-person time though.',
    'Top-tier design team, great design systems, meaningful merchant impact',
    'Remote can feel isolating, winter cohort is smaller, less intern programming',
    4, 4, 5, 3, 4, true, false, 'OCAD University', 'en', 'approved', 2,
    NOW() - INTERVAL '2 months'
  );

  -- 5. Desjardins — Finance Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_desjardins, 'seed_review_05', 'Financial Analyst Intern', 'Finance', 2025, 'Summer',
    'Lévis', false, 24, 'hourly',
    'Solid internship in a large financial institution. The team was very welcoming and I got exposure to credit risk modeling and portfolio analysis. The work-life balance is excellent, I rarely stayed past 5pm. The coop structure is well-organized with midpoint and final evaluations. Good stepping stone if you want to work in Canadian financial services.',
    'Great work-life balance, structured program, exposure to real financial analysis',
    'Some legacy systems are painful to work with, pay is below tech company standards',
    4, 3, 4, 3, 3, true, false, 'Université Laval', 'en', 'approved', 0,
    NOW() - INTERVAL '1 week'
  );

  -- 6. Desjardins — Data Intern — Winter 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_desjardins, 'seed_review_06', 'Data Analyst Intern', 'Data', 2025, 'Winter',
    'Montreal', false, 22, 'hourly',
    'I worked on customer segmentation models using Python and SQL. The data infrastructure is a mix of modern and legacy, which was actually educational. My manager was supportive but very busy, so I had to be proactive about asking for guidance. The Montreal office is nice and centrally located. Decent experience overall but don''t expect cutting-edge tech.',
    'Interesting financial data problems, good office location, supportive team',
    'Manager was often unavailable, tech stack feels dated in some areas, lower pay',
    3, 3, 4, 2, 3, true, NULL, 'Polytechnique Montréal', 'en', 'approved', 1,
    NOW() - INTERVAL '6 weeks'
  );

  -- 7. Microsoft — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_microsoft, 'seed_review_07', 'Software Engineering Intern', 'SWE', 2025, 'Summer',
    'Redmond', false, 56, 'hourly',
    'Microsoft''s intern program is incredibly well-structured. I worked on Azure and had the chance to present my project to a VP. The campus is beautiful with tons of amenities. My mentor met with me daily during the first two weeks, then twice a week after that. The Explore and Intern Day events were highlights. Compensation package including housing stipend is very competitive.',
    'Well-structured program, excellent compensation, campus amenities, strong mentorship',
    'Org is massive so navigating internal tools takes time, some teams move slowly',
    5, 5, 4, 5, 5, true, true, 'University of Toronto', 'en', 'approved', 4,
    NOW() - INTERVAL '10 days'
  );

  -- 8. Microsoft — Marketing Intern — Fall 2024
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_microsoft, 'seed_review_08', 'Marketing Intern', 'Marketing', 2024, 'Fall',
    'Vancouver', false, 35, 'hourly',
    'Great experience on the marketing side of a tech giant. I worked on go-to-market strategy for a new Copilot feature. The Vancouver office is smaller and more intimate than Redmond. My manager was a great communicator and gave clear expectations. I would have preferred more creative work versus data analysis, but I understand the importance of both.',
    'Clear expectations, good manager, nice office, exposure to product launches',
    'More analytical than creative, fall cohort is small, limited intern events',
    4, 3, 4, 4, 3, true, false, 'UBC', 'en', 'approved', 0,
    NOW() - INTERVAL '5 months'
  );

  -- 9. Ubisoft — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_ubisoft, 'seed_review_09', 'Gameplay Programmer Intern', 'SWE', 2025, 'Summer',
    'Montreal', false, 28, 'hourly',
    'If you love games, this is a dream internship. I worked on an unannounced AAA title which was surreal. The Montreal studio is massive and the gamedev culture is unique. Mentorship depends heavily on your team; mine was fantastic. The crunch culture reputation is real but as an intern I wasn''t pressured. The pay is lower than pure tech but the experience is unmatched for gamedev.',
    'Working on AAA games, amazing studio culture, passionate coworkers, creative freedom',
    'Pay below tech industry average, crunch culture exists (less for interns), NDA limits what you can share',
    4, 5, 5, 3, 4, true, NULL, 'Concordia University', 'en', 'approved', 6,
    NOW() - INTERVAL '4 days'
  );

  -- 10. National Bank — Finance Intern — Winter 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_nbc, 'seed_review_10', 'Investment Banking Intern', 'Finance', 2025, 'Winter',
    'Montreal', false, 26, 'hourly',
    'My experience at National Bank was positive overall. The investment banking team is smaller than Big 5 banks, which means more responsibility earlier. I built financial models and helped with pitch decks for real transactions. Hours were long (often until 8pm) but the team ordered dinner when we stayed late. Good brand in Quebec if you want to stay in the province.',
    'Real deal exposure, smaller team means more responsibility, good Quebec brand',
    'Long hours, pay could be better, systems feel dated compared to Big 5',
    3, 4, 3, 3, 3, true, false, 'HEC Montréal', 'en', 'approved', 2,
    NOW() - INTERVAL '2 months'
  );

  -- 11. Amazon — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_amazon, 'seed_review_11', 'Software Development Engineer Intern', 'SWE', 2025, 'Summer',
    'Seattle', false, 58, 'hourly',
    'Amazon moves fast and expects a lot from interns. I owned an entire service end-to-end which was both exciting and stressful. The leadership principles are deeply embedded in how teams operate. Compensation is top-tier. My manager was solid and gave me space to figure things out while being available when I was stuck. Be prepared to write design docs and defend your decisions.',
    'Full ownership of projects, competitive pay, learn to operate at scale, career growth',
    'High-pressure culture, work-life balance varies by team, on-call expectations even as intern',
    4, 5, 3, 5, 4, true, true, 'University of Waterloo', 'en', 'approved', 2,
    NOW() - INTERVAL '8 days'
  );

  -- 12. Amazon — SWE Intern — Fall 2024
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_amazon, 'seed_review_12', 'Software Development Engineer Intern', 'SWE', 2024, 'Fall',
    'Toronto', false, 52, 'hourly',
    'Mixed feelings about my time here. The technical challenges were real and I learned a ton about distributed systems. However, my team had poor work-life balance and I felt pressure to work evenings. The Toronto office is nice but the culture felt very metrics-driven. If you get a good team it''s amazing, if not it can be rough. Still a great resume builder.',
    'Strong technical learning, good pay, resume prestige, real distributed systems work',
    'Work-life balance depends entirely on team, metrics-obsessed culture, can feel impersonal',
    3, 4, 2, 5, 3, false, false, 'University of Toronto', 'en', 'approved', 3,
    NOW() - INTERVAL '4 months'
  );

  -- 13. CGI — SWE Intern — Summer 2024
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_cgi, 'seed_review_13', 'Software Developer Intern', 'SWE', 2024, 'Summer',
    'Montreal', false, 22, 'hourly',
    'CGI is a massive consulting firm and your experience will depend entirely on the client project you''re assigned to. I was placed on a government legacy system migration which wasn''t the most exciting work. The team was friendly but the mentorship was minimal since everyone was busy with deliverables. It''s a fine first internship but I''d aim higher for your second one.',
    'Friendly team, exposure to enterprise consulting, flexible hours',
    'Low pay, legacy tech stack, minimal mentorship, project assignment is luck of the draw',
    3, 2, 3, 2, 2, false, NULL, 'Université de Montréal', 'en', 'approved', 1,
    NOW() - INTERVAL '9 months'
  );

  -- 14. Bell — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_bell, 'seed_review_14', 'Network Engineering Intern', 'SWE', 2025, 'Summer',
    'Montreal', false, 25, 'hourly',
    'Bell is a solid company for telecom-interested interns. I worked on network automation scripts and got exposure to 5G infrastructure. The office culture is corporate but my immediate team was relaxed. Mentorship was decent, with bi-weekly check-ins. The work wasn''t as fast-paced as a startup but I learned about large-scale infrastructure. Good work-life balance overall.',
    'Good work-life balance, exposure to telecom infrastructure, stable environment',
    'Corporate bureaucracy, not cutting-edge tech, slower pace of development',
    3, 3, 4, 3, 3, true, NULL, 'ÉTS', 'en', 'approved', 0,
    NOW() - INTERVAL '12 days'
  );

  -- 15. Bombardier — Engineering Intern — Winter 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_bombardier, 'seed_review_15', 'Software Integration Intern', 'SWE', 2025, 'Winter',
    'Montreal', false, 24, 'hourly',
    'Really cool to work in aerospace. I helped with software integration testing for avionics systems. The engineering rigor is much higher than typical software companies because everything must be certified. My mentor was a 20-year veteran who taught me a lot about safety-critical software. The corporate culture is old-school but respectful. A unique experience you won''t find at a tech startup.',
    'Unique aerospace exposure, rigorous engineering practices, experienced mentors',
    'Slower pace, old-school corporate culture, documentation-heavy processes',
    4, 4, 3, 3, 3, true, false, 'Polytechnique Montréal', 'en', 'approved', 1,
    NOW() - INTERVAL '3 months'
  );

  -- 16. SAP — SWE Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_sap, 'seed_review_16', 'Full Stack Developer Intern', 'SWE', 2025, 'Summer',
    'Montreal', false, 30, 'hourly',
    'SAP Montreal was a pleasant surprise. The team works on cloud-based ERP features using modern React and Node.js stack. I had a dedicated mentor who reviewed my code daily and taught me about clean architecture. The intern cohort was small but tight-knit. SAP isn''t the flashiest name in tech but the engineering culture in Montreal is genuinely good. Solid stepping stone.',
    'Modern tech stack, dedicated mentorship, good engineering culture, reasonable hours',
    'Enterprise software can feel abstract, not the most exciting brand, office is a bit far from downtown',
    4, 4, 4, 3, 4, true, true, 'Concordia University', 'en', 'approved', 0,
    NOW() - INTERVAL '6 days'
  );

  -- 17. TD Bank — Data Intern — Summer 2025
  INSERT INTO reviews (company_id, token_hash, role_title, role_type, year, season, city, is_remote, pay_amount, pay_type, body, pros, cons, rating_mentorship, rating_work_quality, rating_culture, rating_compensation, rating_return_offer, would_recommend, received_offer, school, language, status, helpful_count, created_at)
  VALUES (
    v_td, 'seed_review_17', 'Data Analytics Intern', 'Data', 2025, 'Summer',
    'Toronto', false, 28, 'hourly',
    'TD has a well-organized coop program with clear milestones and evaluation criteria. I worked on customer analytics dashboards using Python, SQL, and Tableau. The team was welcoming and there were plenty of networking events with other interns. The pace is steady rather than fast. It''s a great place to learn the fundamentals of working in a large organization.',
    'Well-organized program, networking opportunities, structured learning, good benefits',
    'Slow-moving bureaucracy, conservative tech choices, work can feel routine',
    3, 3, 4, 3, 3, true, false, 'University of Toronto', 'en', 'approved', 0,
    NOW() - INTERVAL '9 days'
  );

  RAISE NOTICE 'Seed complete: 12 companies and 17 reviews inserted.';

END $$;
