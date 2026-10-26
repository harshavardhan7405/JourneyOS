-- Migration: 0002_seed_data.sql
-- Purpose: Insert demo data for JourneyOS development and testing
-- Author: JourneyOS Team
-- Version: 1.0.0

-- ============ Profiles ============
INSERT INTO profiles (email, full_name, role) VALUES
  ('admin@journeyos.dev', 'Administrator', 'admin'),
  ('parent@journeyos.dev', 'Parent User', 'parent'),
  ('student1@journeyos.dev', 'Alex Johnson', 'student'),
  ('student2@journeyos.dev', 'Sam Rodriguez', 'student')
ON CONFLICT (email) DO NOTHING;

SELECT 'Profiles created' AS status;

-- ============ ParentStudentRelationships ============
INSERT INTO parent_student_relationships (parent_id, student_id)
SELECT p.id, s.id FROM profiles p, profiles s
WHERE p.email = 'parent@journeyos.dev' AND s.email = 'student1@journeyos.dev'
ON CONFLICT (parent_id, student_id) DO NOTHING;

INSERT INTO parent_student_relationships (parent_id, student_id)
SELECT p.id, s.id FROM profiles p, profiles s
WHERE p.email = 'parent@journeyos.dev' AND s.email = 'student2@journeyos.dev'
ON CONFLICT (parent_id, student_id) DO NOTHING;

SELECT 'Relationships created' AS status;

-- ============ Destinations ============
INSERT INTO destinations (name, country, description, image_url) VALUES
  ('Santorini, Greece', 'Greece', 'The white-washed buildings of Oia and the volcanic caldera of Nea Kamini await your arrival.', 'https://images.unsplash.com/photo-1543248073-02fb1d0b3ab3?w=1200'),
  ('Tokyo, Japan', 'Japan', 'Experience the blend of ancient traditions and cutting-edge technology in Tokyo.', 'https://images.unsplash.com/photo-1554797589-7241a1a11554?w=1200'),
  ('Reykjavik, Iceland', 'Iceland', 'Explore geysers, waterfalls, and geothermal pools under a midnight sun.', 'https://images.unsplash.com/photo-1504829811270-88a16f9e6ef2?w=1200'),
  ('Bali, Indonesia', 'Indonesia', 'Discover lush rice terraces, sacred temples, and tropical beaches.', 'https://images.unsplash.com/photo-1533165850475-6689c3ef5e3a?w=1200'),
  ('Marrakech, Morocco', 'Morocco', 'Step into a vibrant world of spice markets, historic medinas, and desert landscapes.', 'https://images.unsplash.com/photo-1597293165748-88f05af626d7?w=1200')
ON CONFLICT (name, country) DO NOTHING;

SELECT 'Destinations created' AS status;

-- ============ Programmes ============
INSERT INTO programmes (title, description, destination_id, duration_weeks, age_min, age_max, price_cents, currency, availability, start_date, end_date, learning_outcomes, what_included) VALUES
  ('Grade 5–8: STEAM Explorers — Santorini', 'A 6-week immersive programme exploring engineering, art, and astronomy on Santorini island.', 'd1', 6, 9, 13, 480000, 'USD', 15, '2025-06-01', '2025-07-15', '["learn about volcanic geology", "create engineering structures", "explore ancient Greek history", "develop observation skills for astronomy", "practice collaborative problem-solving"]', '["Daily guided excursions", "Expert marine biologist sessions", "Camping near thermal baths", "Weekly creative workshops", "Mountain biking excursions", "Kayaking guided tours"]'),
  ('Grade 3–4: Nature Detectives — Reykjavik', 'An outdoor adventure programme focused on ecology, conservation, and the natural wonders of Iceland.', 'd3', 4, 7, 12, 360000, 'EUR', 20, '2025-06-15', '2025-08-15', '["study freshwater ecosystems", "identify local bird species", "understand renewable energy", "develop wilderness survival skills", "appreciate cultural heritage"]', '["Scenic bus tours", "Ice cave exploration", "Forest bathing walks", "Junior Ranger certification", "Cultural workshops", "Mini-hiking challenges"]'),
  ('Grades 10–12: Innovation Lab — Tokyo', 'Explore emerging technologies, robotics, and digital creativity through hands-on projects in Tokyo.', 'd2', 8, 14, 18, 720000, 'JPY', 10, '2025-07-01', '2025-09-27', '["understand basic robotics", "experiment with AI concepts", "develop programming fundamentals", "investigate sustainable tech solutions", "build functional prototypes"]', '["Tokyo Tech visits", "Robotics competitions", "Maker space access", "Lunch at local innovation hubs", "Technology exhibition tickets", "Academic mentorship sessions"]'),
  ('Grades 5–8: Reef Rangers — Bali', 'A marine biology programme diving deep into coral reefs, ecosystems, and conservation efforts.', 'd4', 5, 9, 14, 420000, 'USD', 12, '2025-06-20', '2025-08-20', '["study coral reef ecosystems", "identify marine species", "participate in beach cleanups", "develop research methodology", "appreciate environmental stewardship"]', '["Snorkelling excursions", "Coral reef identification", "Surf lessons", "Traditional cooking classes", "Beach conservation projects", "Night diving experience"]'),
  ('Grades 9–11: Medinas & Markets — Marrakech', 'Discover Moroccan culture through markets, architecture, and creative expression.', 'd5', 4, 13, 17, 300000, 'USD', 18, '2025-07-10', '2025-08-13', '["explore architectural design", "understand traditional commerce", "discover calligraphy and crafts", "develop storytelling abilities", "investigate cultural heritage preservation"]', '["Guided medina tours", "Souk shopping workshops", "Artisan crafting sessions", "Camel trek experiences", "Cooking classes with local families", "Film screening nights"]')
ON CONFLICT DO NOTHING;

SELECT 'Programmes created' AS status;

-- ============ Itinerary Items ============
INSERT INTO itinerary_items (programme_id, day_number, title, description, activities) VALUES
  ('p1', 1, 'Welcome & Orientation', 'Arrival, team building, programme overview', '["Welcome briefing", "Team icebreaker games", "Programme overview video"]'),
  ('p1', 2, 'Volcano Adventure', 'Visit the caldera and learn about volcanic geology', '["Guided caldera tour", "Geological demonstration", "Field journaling"]'),
  ('p1', 3, 'Engineering Challenge', 'Build structures that withstand simulated earthquakes', '["Bridge building challenge", "Group presentations", "Debrief session"]'),
  ('p1', 4, 'Ancient History', 'Explore archaeological sites and historical ruins', '["Site visit guided tour", "Artifact handling workshop", "Historical storytelling"]'),
  ('p1', 5, 'Astronomy Night', 'Learn stargazing techniques and constellation mapping', '["Dark sky observation", "Star chart creation", "Guest astronomer talk"]'),
  ('p1', 6, 'Final Presentations & Graduation', 'Present group work and receive certificates', '["Project presentations", "Graduation ceremony", "Certificate distribution"]'),

  ('p2', 1, 'Arrival & Orientation', 'Meet guides, set expectations, outdoor safety briefing', '["Welcome orientation", "Safety briefing", "Gear check"]'),
  ('p2', 2, 'Water Systems Study', 'Explore rivers, lakes, and water treatment facilities', '["River field study", "Pollution impact analysis", "Design solutions workshop"]'),
  ('p2', 3, 'Birdwatching Expedition', 'Go birdwatching along Icelandic waterways', '["Field guide training", "Guided birdwalk", "Species documentation"]'),
  ('p2', 4, 'Geothermal Exploration', 'Visit hot springs and learn about Icelandic energy', '["Hot spring visit", "Energy systems workshop", "Local energy tour"]'),
  ('p2', 5, 'Cultural Immersion', 'Experience Icelandic culture through food and music', '["Traditional food workshop", "Folk music session", "Storytelling circle"]'),
  ('p2', 6, 'Wilderness Survival Challenge', 'Navigate an outdoor survival scenario', '["Map reading exercise", "Team shelter building", "Final assessment"]'),
  ('p2', 7, 'Reflection & Departure', 'Reflect on learning journey, farewell dinner', '["Learning reflection journal", "Group photo", "Departure transfers"]'),

  ('p3', 1, 'Welcome to Tokyo Tech City', 'Introduction to innovation ecosystem and programme goals', '["Welcome presentation", "Tech city orientation tour", "Team formation"]'),
  ('p3', 2, 'Robotics Fundamentals', 'Build and program basic robots using Arduino', '["Robot assembly workshop", "Programming basics", "First robot test"]'),
  ('p3', 3, 'AI & Machine Learning', 'Explore simple machine learning concepts with tools', '["AI introduction lecture", "Interactive demos", "Hands-on classification project"]'),
  ('p3', 4, 'Digital Design Studio', 'Create interactive digital artworks using creative coding', '["Creative coding intro", "Live coding workshops", "Project showcase"]'),
  ('p3', 5, 'Sustainable Tech Solutions', 'Investigate green technology applications', '["Green tech case studies", "Design thinking exercise", "Proposal development"]'),
  ('p3', 6, 'Innovation Showcase', 'Present final projects to judges and peers', '["Project presentations", "Judging panel Q&A", "Certificate ceremony"]'),

  ('p4', 1, 'Reef Discovery Day', 'Snorkelling experience and underwater ecology basics', '["Snorkelling gear fitting", "Marine ecology lesson", "Underwater species identification"]'),
  ('p4', 2, 'Coral Restoration Project', 'Join a real coral restoration effort', '["Coral propagation methods", "Underwater planting", "Monitoring assignment"]'),
  ('p4', 3, 'Beach Clean-up Crew', 'Participate in a community beach conservation day', '["Cleanup logistics briefing", "Beach data collection", "Hypothesis testing"]'),
  ('p4', 4, 'Surf Skills Camp', 'Learn fundamental surfing techniques', '["Board rental and fitting", "Pop-up technique clinic", "Tide awareness session"]'),
  ('p4', 5, 'Ocean Science Lab', 'Analyze ocean data and understand marine food webs', '["Data analysis workshop", "Food web modeling", "Research report writing"]'),
  ('p4', 6, 'Traditional Cooking & Sunsets', 'Prepare Balinese cuisine together, end the week with sunset sail', '["Menu planning session", "Cooking class", "Sunset sailing"]'),

  ('p5', 1, 'Medina Welcome', 'Orientation and architectural walking tour', '["Medina orientation walk", "Architecture fundamentals", "Group exploration"]'),
  ('p5', 2, 'Spice Market Workshop', 'Learn about spices, tea, and trade traditions', '["Market tour", "Spice grinding demonstration", "Cooking class with market ingredients"]'),
  ('p5', 3, 'Crafts & Calligraphy', 'Introduce traditional Moroccan arts', '["Calligraphy basics", "Weaving workshop", "Pottery creation"]'),
  ('p5', 4, 'Camel Trek & Desert Tales', 'Morning camel trek and evening storytelling campfire', '["Camel trek", "Desert survival skills", "Storytelling evening"]')
ON CONFLICT DO NOTHING;

SELECT 'Itinerary items created' AS status;

-- ============ Registrations (Demo Data) ============
INSERT INTO registrations (user_id, programme_id, student_id, status, payment_status, amount_cents, currency) VALUES
  ('pr1', 'p1', 's1', 'confirmed', 'paid', 480000, 'USD'),
  ('pr2', 'p2', 's1', 'pending', 'pending', 360000, 'EUR'),
  ('pr3', 'p3', 's2', 'confirmed', 'paid', 720000, 'JPY'),
  ('pr4', 'p4', 's2', 'pending', 'pending', 420000, 'USD'),
  ('pr5', 'p5', 's1', 'confirmed', 'paid', 300000, 'USD'),
  ('pr6', 'p1', 's2', 'pending', 'pending', 480000, 'USD'),
  ('pr7', 'p2', 's2', 'confirmed', 'refunded', 360000, 'EUR'),
  ('pr8', 'p3', 's1', 'cancelled', 'failed', 720000, 'JPY')
ON CONFLICT DO NOTHING;

SELECT 'Registrations created' AS status;

-- ============ Announcements ============
INSERT INTO announcements (title, content, created_by) VALUES
  ('Welcome to JourneyOS!', 'We are thrilled to welcome you to JourneyOS — your premier educational travel management platform. Here are some quick highlights:', 'admin@journeyos.dev')
ON CONFLICT DO NOTHING;

SELECT 'Announcements created' AS status;

-- ============ Announcement Recipients (Demo) ============
INSERT INTO announcement_recipients (announcement_id, user_id, read)
SELECT a.id, r.user_id, false FROM announcements a, profiles r WHERE a.created_by IS NULL OR true
ON CONFLICT DO NOTHING;

SELECT 'Announcement recipients created' AS status;

-- ============ Payment Orders (Demo) ============
INSERT INTO payment_orders (user_id, registration_id, amount_cents, currency, status, razorpay_order_id, razorpay_payment_id, razorpay_signature, attempts) VALUES
  ('pr1', 'pr1', 480000, 'USD', 'paid', 'rzp_demo_order_1', 'rzp_demo_payment_1', 'demo_sig_1', 1),
  ('pr3', 'pr3', 720000, 'JPY', 'paid', 'rzp_demo_order_2', 'rzp_demo_payment_2', 'demo_sig_2', 1),
  ('pr5', 'pr5', 300000, 'USD', 'paid', 'rzp_demo_order_3', 'rzp_demo_payment_3', 'demo_sig_3', 1)
ON CONFLICT DO NOTHING;

SELECT 'Payment orders created' AS status;

SELECT 'Seed data complete' AS status;