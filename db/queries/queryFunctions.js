const { Client } = require('pg');
const info = require('./config.js');

const client = new Client(info);

client.connect();

// GET HELPERS
const getReviews = (id, sorter, count) => {
  const text = `SELECT review_id, summary FROM reviews WHERE product_id = ${id} LIMIT 20`;
  client.query(text, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
  });
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