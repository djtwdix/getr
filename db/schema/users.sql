
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255,)
  city VARCHAR(255),
  province VARCHAR(255),
  country VARCHAR(255),
  profile_pic VARCHAR(255)
);
