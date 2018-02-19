'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var greeter = require('./greeter.js');

app.get('/', function (req, res) {
  res.send(greeter());
});

app.listen(process.env.PORT || 3000);

// import http from 'http';
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';


// import config from './config';
// import routes from './routes';

// let app = express();
// app.server = http.createServer(app);

// //middleware

// //passport
// app.use('/v1', routes);

// //api routes
// app.server.listen(config.port);
// console.log(`Started on port ${app.server.address().port}`);

// export default app;
//# sourceMappingURL=app.js.map