CREATE TABLE IF NOT EXISTS characteristics (
  id int,
  product_id int,
  name varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id int,
  characteristic_id int,
  review_id int,
  value int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id int,
  product_id int,
  rating int,
  date varchar(100),
  summary varchar(1000),
  body varchar(1000),
  recommend boolean,
  reported boolean,
  reviewer_name varchar(100),
  reviewer_email varchar(100),
  response varchar(1000),
  helpfulness int,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id int,
  review_id int,
  url varchar(1000),
  PRIMARY KEY (id)
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