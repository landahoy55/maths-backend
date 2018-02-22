// import express from 'express';
// var app = express();
// var greeter = require('./greeter.js');

// app.get('/', function (req, res) {
//   res.send(greeter());
// });

// app.listen(process.env.PORT || 3000);

// import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

const LocalStrategy = require('passport-local').Strategy;
// import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import routes from './routes';

let app = express();
// app.server = http.createServer(app);

//middleware - bodyparser for handling JSON. Limit set to avoid large amounts of data
app.use(bodyParser.json({
    limit: config.bodyParser
}));
app.use(bodyParser.urlencoded({ extended: true}));

//passport
//auth layer
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    Account.authenticate()
));
//seralisation and deserialisation required
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes
app.use('/v1', routes);

//Testing web routes
app.get('/test', function(req, res) {

    res.status(200).send("Hello worldyee");
 
 });


var listener = app.listen(config.port);
console.log(`Started on port ${listener.address().port}`);

// export default app;
exports = module.exports = app;