import express from 'express';
var app = express();
var greeter = require('./greeter.js');

app.get('/', function (req, res) {
  res.send(greeter());
});

app.listen(process.env.PORT || 3000);