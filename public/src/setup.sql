-- CREATE ORGANIZATION TABLE --

CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description VARCHAR(250) NOT NULL,
	contact_email VARCHAR(250) NOT NULL,
	logo_filename VARCHAR(250) NOT NULL
	);

-- POPULATE ORGANIZATION TABLE --

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- CREATE SERVICE PROJECTS TABLE --

CREATE TABLE service_projects (
	project_ID  SERIAL PRIMARY KEY,
	organization_id INTEGER,
	title VARCHAR(150) NOT NULL,
	description VARCHAR(250) NOT NULL,
	location VARCHAR(250) NOT NULL,
	date DATE NOT NULL,
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
	);

-- POPULATE SERVICE PROJECTS TABLE --

INSERT INTO service_projects (organization_id, title, description, location, date) 
VALUES
(1, 'Community Food Drive', 'Collect and sort non-perishable food items for local families in need.', 'Community Center Hall A', '2026-10-12'), (1, 'Neighborhood Park Cleanup', 'Pick up litter, weed flower beds, and paint park benches.', 'Greenwood Public Park', '2026-10-19'), (1, 'Winter Coat Distribution', 'Distribute winter coats, hats, and blankets to homeless shelters.', 'Downtown Shelter Annex', '2026-11-05'), (1, 'Senior Tech Literacy Workshop', 'Assist senior citizens with smartphone basics and safe internet habits.', 'Senior Living Community Room', '2026-11-14'), (1, 'Blood Donation Drive', 'Partner with the Red Cross to host a community blood drive.', 'Main Stake Center Gymnasium', '2026-12-01');

INSERT INTO service_projects (organization_id, title, description, location, date)
VALUES
(2, 'Youth Coding Bootcamp', 'Teach basic HTML and CSS fundamentals to middle school students.', 'Public Library Computer Lab', '2026-10-15'), (2, 'After-School Math Tutoring', 'Provide one-on-one math tutoring for elementary school students.', 'Local Elementary Library', '2026-10-22'), (2, 'STEM Career Fair Panelist', 'Speak to high school students about careers in software and web development.', 'High School Auditorium', '2026-11-10'), (2, 'Recycled Robot Workshop', 'Help kids build fun crafts and simple mechanical toys out of recycled goods.', 'Community Rec Center', '2026-11-20'), (2, 'Library Book Inventory Sorting', 'Organize, repair, and catalogue newly donated books for the children section.', 'City Central Library', '2026-12-05'); 

INSERT INTO service_projects (organization_id, title, description, location, date) 
VALUES
(3, 'Tree Planting Initiative', 'Plant native saplings along hiking trails to help reforestation efforts.', 'Mountain Foothills Trailhead', '2026-10-18'), (3, 'Riverbank Plastic Cleanup', 'Remove plastic waste and debris along the local riverbank shoreline.', 'Riverside Park West', '2026-10-26'), (3, 'Community Garden Harvest', 'Harvest autumn vegetables and prepare garden beds for winter protection.', 'Eastside Community Garden', '2026-11-08'), (3, 'Trail Marker Maintenance', 'Repaint and secure wooden trail markers and safety signs.', 'Akyat-Tanaw Nature Reserve', '2026-11-21'), (3, 'Composting Workshop', 'Educate community members on home composting methods and waste reduction.', 'Eco-Center Seminar Hall', '2026-12-10');

-- CREATE CATEGORIES TABLE --

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL
);

-- POPULATE CATEGORIES TABLE --

INSERT INTO categories (category_name)
VALUES 
('Food Drive'), ('Youth Mentoring'), ('Environmental convservation'), ('Health & Wellness'), ('Education');

SELECT * FROM categories;

-- CREATE SERVICE CATEGORY TABLE --

CREATE TABLE service_category (
	category_id INTEGER NOT NULL,
	project_id INTEGER NOT NULL, 
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
	FOREIGN KEY (project_id) REFERENCES service_projects(project_id)
)

-- POPULATE SERVICE CATEGORY TABLE --

INSERT INTO service_category(category_id, project_id)
VALUES (1, 1), (2, 2), (3, 3);