const express = require('express');
const queries = require('../db/queries/queryFunctions.js');

const PORT = 3000;

// App
const app = express();

// GET ROUTES
app.get('/reviews/:product_id', (req, res) => {
  // query goes here
  queries.getReviews(req.params.product_id);
});

app.get('/reviews/meta/:product_id', (req, res) => {
  // query goes here
  queries.getReviewsMetaData(req.params.product_id);
});

// POST ROUTE
app.post('/reviews:product_id', (req, res) => {
  // query goes here
});

// PUT ROUTE
app.put('/reviews/report/:review_id', (req, res) => {
  // query goes here
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}...`);