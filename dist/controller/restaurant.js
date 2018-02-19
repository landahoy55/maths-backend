'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _restaurant = require('../model/restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //CREATE
    // 'v1/restaurant/add'
    api.post('/add', function (req, res) {
        var newRest = new _restaurant2.default();
        newRest.name = req.body.name;

        newRest.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Saved' });
        });
    });

    //GET - READ
    //v1/resturant
    api.get('/', function (req, res) {
        _restaurant2.default.find({}, function (err, restaurants) {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    return api;
};
//# sourceMappingURL=restaurant.js.map