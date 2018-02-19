'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//app.server = http.createServer(app);

//middleware - bodyparser for handling JSON. Limit set to avoid large amounts of data
// import express from 'express';
// var app = express();
// var greeter = require('./greeter.js');

// app.get('/', function (req, res) {
//   res.send(greeter());
// });

// app.listen(process.env.PORT || 3000);

//import http from 'http';
app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyParser
}));

//passport
//auth layer

//api routes
app.use('/v1', _routes2.default);

//Testing web routes
app.get('/test', function (req, res) {

    res.status(200).send("Hello world");
});

var listener = app.listen(_config2.default.port);
console.log('Started on port ' + listener.address().port);

exports.default = app;
//# sourceMappingURL=app.js.map