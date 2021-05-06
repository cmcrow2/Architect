var fs = require('fs');
var csvParse = require('csv-parser');
var csvWrite = require('csv-writer').createObjectCsvWriter;

var characteristicsReviewsFilePath = './characteristic_reviews.csv';
var csvWriter = csvWrite({
  path: './transformedCharacteristicsReviews.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'characteristic_id', title: 'characteristic_id' },
    { id: 'review_id', title: 'review_id' },
    { id: 'value', title: 'value' }
  ]
});
var transformedData = [];

fs.createReadStream(characteristicsReviewsFilePath)
  .pipe(csvParse())
  .on('data', function (data) {
    try {
      if (data.value) {
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