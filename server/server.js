const express = require('express');
const queries = require('../db/queries/queryFunctions.js');
const moment = require('moment');

const PORT = 3001;

// App
const app = express();
app.use(express.json());

// LoaderIO GET Request
app.get('/loaderio-3f41a61d1e54f97c5f5e5d9dfc1f69cc/', (req, res) => {
  res.send('loaderio-3f41a61d1e54f97c5f5e5d9dfc1f69cc');
});

// GET ROUTES
app.get('/reviews/:product_id', (req, response) => {
  // query goes here
  queries.getReviews(req.params.product_id, 20, (err, res) => {
    response.send(res);
  });
});

app.get('/reviews/:product_id/meta', (req, response) => {
  // query goes here
  queries.getReviewsMetaData(req.params.product_id, (err, res) => {
    response.send(res);
  });
});

// POST ROUTE
app.post('/reviews/:product_id', (req, response) => {
  // query goes here
  queries.postReview(req.params.product_id, req.body, (err, res) => {
      response.send(res);
  });
});

// PUT ROUTE
app.put('/reviews/report/:review_id', (req, response) => {
  // query goes here
  queries.reportReview(req.params.review_id, (err, res) => {
    response.send(res);
  });
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}...`);
