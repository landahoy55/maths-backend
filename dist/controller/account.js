'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //login in admin

    api.post('/test', function (req, res) {
        res.status(200).send('HERE!');
    });

    //Register
    // v1/account
    api.post('/register', function (req, res) {
        _account2.default.register(new _account2.default({ username: req.body.email, name: req.body.name }), req.body.password, function (err, account) {
            if (err) {
                res.send(err);
            }
            _passport2.default.authenticate('local', {
                session: false
            })(req, res, function () {
                res.status(200).send('Successfully created account');
            });
        });
    });

    //Login
    // v1/account/login
    api.post('/login', _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authMiddleware.generateAccessToken, _authMiddleware.respond);

    // api.post('/weblogin', passport.authenticate(
    //     'local', {
    //         session: false,
    //         scope: []
    //     }), generateAccessToken, respond
    // );

    api.post('/web', (0, _authMiddleware.checkAdmin)(), _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authMiddleware.generateAccessToken, _authMiddleware.respond);

    //Logout
    // v1/account/logout
    api.post('/logout', _authMiddleware.authenticate, function (req, res) {
        res.logout();
        res.status(200).send('Successfully logged out');
    });

    //Request user info - get ID
    api.get('/me', _authMiddleware.authenticate, function (req, res) {
        res.status(200).json(req.user);
    });

    //Retreive user information - ie, name
    api.get('/details/:id', _authMiddleware.authenticate, function (req, res) {
        _account2.default.findById(req.params.id, function (err, account) {
            if (err) {
                res.send(err);
            }
            res.json(account);
        });
    });

    return api;
};
//# sourceMappingURL=account.js.map