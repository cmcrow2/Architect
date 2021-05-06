var fs = require('fs');
var csvParse = require('csv-parser');
var csvWrite = require('csv-writer').createObjectCsvWriter;

var characteristicsFilePath = './characteristics.csv';
var csvWriter = csvWrite({
  path: './transformedCharacteristics.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'product_id', title: 'product_id'},
    {id: 'name', title: 'name'}
  ]
});
var transformedData = [];

fs.createReadStream(characteristicsFilePath)
  .pipe(csvParse())
  .on('data', function(data){
    try {
      if (data.name) {
        transformedData.push(data);
      }
    }
    catch(err) {
      console.log(err);
    }
  })
  .on('end', function() {
    csvWriter.writeRecords(transformedData)
      .then(() => {
        console.log('...Done');
      });
  });