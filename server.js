var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const connectToDB = require('./db-connect');
const filterRecords = require('./filter').filterRecords;
const validate = require('./validation');

connectToDB(); // connect to remote database first.

app.post('/', function (req, res) {

  const { isValid, errors } = validate(req.body);
  if (!isValid) {
    return res.status(400).json({
      code: 400,
      msg: "bad request, the parameters given in wrong formats",
      errors,
      records: []
    });
  }

  const { minCount, maxCount, startDate, endDate } = req.body;
  filterRecords(startDate, endDate, parseInt(minCount), parseInt(maxCount)).exec((err, filteredRecords) => {
    if (err) {
      return res.status(400).json({
        code: 500,
        msg: 'An internal database server error occured',
        records: []
      })
    }
    res.status(200).json({
      code: 0,
      msg: 'Success',
      records: filteredRecords
    })
  })
});

let server;
app.on('ready', function () {
  server = app.listen(3000, function () {
    console.log('API listening on port 3000!');
  });
});

mongoose.connection.once('open', function () {
  // All OK - fire (emit) a ready event. 
  app.emit('ready');
});

module.exports = app;
