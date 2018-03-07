'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _topic = require('../model/topic');

var _topic2 = _interopRequireDefault(_topic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // // v1/topics/
    // //GET a topic by title
    // api.get('/get/:title', (req, res) => {

    // });

    // //GET all topics
    api.get('/', function (req, res) {

        // Topic.findOne({title:'Numbers'})
        //     // .populate('subTopics')
        //     .exec({
        //         function (err, topic) {
        //             if (err) {
        //                 res.send(err);
        //             }
        //             console.log(JSON.stringify(topic));
        //             res.json(topic)
        //         }
        //     });

        //TODO: Reinsert data via Mongoose.
        //Schema can't match schemaless docs.

        _topic2.default.find({})
        // .populate('subTopics')
        .populate({ path: 'subTopics', model: 'SubTopic', populate: { path: 'parentTopic', model: 'Topic' } }).exec(function (err, topic) {
            if (err) {
                res.send(err);
            }
            console.log(JSON.stringify(topic));
            res.json(topic);
        });

        // .populate({path: 'subTopicResults', model: 'SubTopicResult', populate: {path: 'subtopic', model: 'SubTopic', populate: {path: 'parentTopic', model: 'Topic'}}})

        // Topic.findOne({}, (err, topics) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     console.log(JSON.stringify(topics));
        //     res.json(topics);
        // });
    });
    return api;
};
//# sourceMappingURL=topic.js.map