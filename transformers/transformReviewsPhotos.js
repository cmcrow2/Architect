var fs = require('fs');
var csvParse = require('csv-parser');
var csvWrite = require('csv-writer').createObjectCsvWriter;

var reviewsPhotosFilePath = './reviews_photos.csv';
var csvWriter = csvWrite({
  path: './transformedReviewsPhotos.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'review_id', title: 'review_id' },
    { id: 'url', title: 'url' }
  ]
});
var transformedData = [];

fs.createReadStream(reviewsPhotosFilePath)
  .pipe(csvParse())
  .on('data', function (data) {
    try {
      if (data.url) {
        transformedData.push(data);
      }
    }
    catch (err) {
      console.log(err);
    }
  })
  .on('end', function () {
    csvWriter.writeRecords(transformedData)
      .then(() => {
        console.log('...Done');
      });
  });