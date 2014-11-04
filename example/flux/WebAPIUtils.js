var d3 = require('d3');
var {receiveData} = require('./ServerActionCreators');

module.exports = {

  getCsvFile(csvFile) {
    d3.csv(csvFile, (err, data) => receiveData(data));
  }

};
