var fs = require('fs');
var csvParse = require('csv-parser');
var csvWrite = require('csv-writer').createObjectCsvWriter;
var moment = require('moment');

var reviewsFilePath = './reviews.csv';
var csvWriter = csvWrite({
  path: './transformedReviews4.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'product_id', title: 'product_id'},
    {id: 'rating', title: 'rating'},
    {id: 'date', title: 'date'},
    {id: 'summary', title: 'summary'},
    {id: 'body', title: 'body'},
    {id: 'recommend', title: 'recommend'},
    {id: 'reported', title: 'reported'},
    {id: 'reviewer_name', title: 'reviewer_name'},
    {id: 'reviewer_email', title: 'reviewer_email'},
    {id: 'response', title: 'response'},
    {id: 'helpfulness', title: 'helpfulness'}
  ]
});
var transformedData = [];

fs.createReadStream(reviewsFilePath)
  .pipe(csvParse())
  .on('data', function(data){
    try {
      if (data.rating < 6) {
        if (!data.date.match(/[A-z]/g)) {
          data.date = Number(data.date);
        }
        data.date = new Date(data.date);
        data.date = moment(data.date).format();
        transformedData.push(data);
      }
    }
    catch(err) {
      console.log(err);
    }
  })
  .on('end', function() {
    csvWriter.writeRecords(transformedData);
      .then(() => {
        console.log('...Done');
      });
  });