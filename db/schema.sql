DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristics_reviews;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE IF NOT EXISTS characteristics (
  id serial PRIMARY KEY,
  product_id int,
  name varchar(50)
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id serial PRIMARY KEY,
  characteristic_id int,
  review_id int,
  value int
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id serial PRIMARY KEY,
  product_id int,
  rating int,
  date varchar(100),
  summary varchar(1000),
  body varchar(1000),
  recommend boolean,
  reported boolean DEFAULT false,
  reviewer_name varchar(100),
  reviewer_email varchar(100),
  response varchar(1000) DEFAULT null,
  helpfulness int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id serial PRIMARY KEY,
  review_id int,
  url varchar(1000) DEFAULT null
);

COPY characteristics
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedCharacteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics_reviews
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedCharacteristicsReviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedReviews1.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedReviews2.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedReviews3.csv'
DELIMITER ','
CSV HEADER;

COPY reviews
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedReviews4.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/Users/cameroncrow/Desktop/work/SDC-Reviews-Service/csvs/transformedReviewsPhotos.csv'
DELIMITER ','
CSV HEADER;

ALTER SEQUENCE reviews_review_id_seq RESTART WITH 5774953;
ALTER SEQUENCE reviews_photos_id_seq RESTART WITH 2742541;