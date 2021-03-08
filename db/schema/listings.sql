
DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id),
  description TEXT,
  cost DECIMAL(6,2) NOT NULL,
  condition VARCHAR(255),
  listing_date DATE,
  brand VARCHAR(255),
  model VARCHAR(255),
  handed VARCHAR(255),
  type VARCHAR(255),
  listing_pic VARCHAR(255),
  listing_thumbnail VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  views NUMBER DEFAULT 0
);
