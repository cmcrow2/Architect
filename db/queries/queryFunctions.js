const { Pool } = require('pg');
const info = require('../../config.js');

const pool = new Pool(info);

// GET HELPERS
const getReviews = (id, sorter, count) => {
  // const photosQuery = `SELECT url FROM reviews_photos WHERE review_id = ${reviewId}`
  const reviewQuery =
    `SELECT
    review_id,
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reviewer_name,
    response,
    helpfulness
    FROM reviews
    WHERE product_id = ${id} AND reported = false
    LIMIT 20`;

  ; (async () => {
    const client = await pool.connect()
    try {
      const res = await client.query(reviewQuery)
      console.log(res.rows)
    } finally {
      client.release()
    }
  })().catch(err => console.log(err.stack))
};

const getReviewsMetaData = (id) => {
  const text = `SELECT rating FROM reviews WHERE product_id = ${id}`;
  client.query(text, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
  });
}

// POST HELPER


// PUT HELPER


module.exports = ({
  getReviews,
  getReviewsMetaData
});