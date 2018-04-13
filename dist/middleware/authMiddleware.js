'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = 60 * 60 * 24 * 30; //30 days
var SECRET = "Th15 15 th3 S3cr3t";

var authenticate = (0, _expressJwt2.default)({ secret: SECRET });

var generateAccessToken = function generateAccessToken(req, res, next) {
    req.token = req.token || {};
    req.token = _jsonwebtoken2.default.sign({
        id: req.user.id
    }, SECRET, {
        expiresIn: TOKENTIME
    });
    next();
};

var respond = function respond(req, res) {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
};

//check admin status
var checkAdmin = function checkAdmin(req, res, next) {
    _account2.default.find({ email: req.body.email }, function (err, account) {

        console.log("In the middleware");

        if (err) {
            // return next(err);
            res.status(401).json({
                message: 'error'
            });
        }

        if (!account) {
            //doesn't exist
            res.status(401).json({
                message: 'account not found'
            });
        }

        if (!account.name) {
            //name property doesn't exist... change to admin
            res.status(401).json({
                message: 'no name property'
            });
        }

        //hand over to passport
        next();
    });
};

module.exports = { authenticate: authenticate, generateAccessToken: generateAccessToken, respond: respond, checkAdmin: checkAdmin };
//# sourceMappingURL=authMiddleware.js.map