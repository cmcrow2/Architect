const { Pool } = require('pg');
const moment = require('moment');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  port: process.env.DB_PORT
});

// GET HELPERS
const getReviews = (id, count, callback, sorter) => {
  const reviewQuery =
    `SELECT reviews.review_id, reviews.product_id, reviews.rating, reviews.date, reviews.summary,
    reviews.body, reviews.recommend, reviews.reviewer_name, reviews.response, reviews.helpfulness,
    (
      SELECT (jsonb_agg(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url))) AS photos
      FROM reviews_photos
      WHERE reviews_photos.review_id = reviews.review_id
    )
    FROM reviews
    WHERE reviews.product_id = ${id} AND reviews.reported = false
    LIMIT ${count}`;

  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(reviewQuery);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

const getReviewsMetaData = (id, callback) => {
  const metaQuery =
    `SELECT product_id, (jsonb_agg(rating)) AS ratings,
    (
      SELECT (jsonb_agg(json_build_object('id', id, 'name', name, 'value',
      (
        SELECT value
        FROM characteristics_reviews
        WHERE characteristics.id = characteristics_reviews.id
      )))) AS characteristics
      FROM characteristics
      WHERE product_id = ${id}
    )
    FROM reviews
    WHERE product_id = ${id} AND reviews.reported = false
    GROUP BY product_id`;

  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(metaQuery);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
}

// POST HELPER
const postReview = (id, newReview, callback) => {
  // define the variables I need to send in
  const {
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos
  } = newReview;
  const date = moment().format();
  const values = [
    id,
    `${rating}`,
    `${date}`,
    `${summary}`,
    `${body}`,
    `${recommend}`,
    `${name}`,
    `${email}`
  ];

  // make the query
  let unnestString = '';
  if (photos === '[]') {
    unnestString = null
  } else {
    unnestString = `unnest(ARRAY${photos})`;
  }

  const newReviewQuery = `WITH new_review AS (
    INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
    VALUES (
      ${id},
      ${rating},
      '${date}',
      '${summary}',
      '${body}',
      ${recommend},
      '${name}',
      '${email}'
    )
    RETURNING review_id
  )
    INSERT INTO reviews_photos (review_id, url)
    SELECT review_id, ${unnestString}
    FROM new_review`;

  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(newReviewQuery);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// PUT HELPER
const reportReview = (id, callback) => {
  // query goes here, update table set colName = true where review_id = id
  const reportQuery = `UPDATE reviews SET reported = true where review_id = ${id}`;

  ;(async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(reportQuery);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

module.exports = ({
  getReviews,
  getReviewsMetaData,
  postReview,
  reportReview
});