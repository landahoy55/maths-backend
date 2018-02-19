'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

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

// import express from 'express';
// var app = express();
// var greeter = require('./greeter.js');

// app.get('/', function (req, res) {
//   res.send(greeter());
// });

// app.listen(process.env.PORT || 3000);

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

//middleware - bodyparser for handling JSON. Limit set to avoid large amounts of data
app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyParser
}));

//passport
//auth layer

//api routes
app.use('/v1', _routes2.default);

app.server.listen(_config2.default.port);
console.log('Started on port ' + app.server.address().port);

exports.default = app;
//# sourceMappingURL=app.js.map