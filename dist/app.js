'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

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

// import http from 'http';
var LocalStrategy = require('passport-local').Strategy;
// import { Strategy as LocalStrategy } from 'passport-local';

var app = (0, _express2.default)();
// app.server = http.createServer(app);

//middleware - bodyparser for handling JSON. Limit set to avoid large amounts of data
app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyParser
}));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

//passport
//auth layer
app.use(_passport2.default.initialize());
var Account = require('./model/account');
_passport2.default.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, Account.authenticate()));
//seralisation and deserialisation required
_passport2.default.serializeUser(Account.serializeUser());
_passport2.default.deserializeUser(Account.deserializeUser());

//api routes
app.use('/v1', _routes2.default);

//Testing web routes
app.get('/test', function (req, res) {

    res.status(200).send("Hello worldyee");
});

var listener = app.listen(_config2.default.port);
console.log('Started on port ' + listener.address().port);

// export default app;
exports = module.exports = app;
//# sourceMappingURL=app.js.map