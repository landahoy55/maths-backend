'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _topic = require('../model/topic');

var _topic2 = _interopRequireDefault(_topic);

var _topicResults = require('../model/topicResults');

var _topicResults2 = _interopRequireDefault(_topicResults);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //Post a topic result
    api.post('/postresult', _authMiddleware.authenticate, function (req, res) {
        var newTopicResult = new _topicResults2.default();

        newTopicResult.achieved = req.body.achieved;
        newTopicResult.topic = req.body.topic;
        newTopicResult.id = req.body.id;
        newTopicResult.subTopicResults = req.body.subTopicResults;

        newTopicResult.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Topic result saved' });
        });
    });

    //Update a topic - how is this handling the array?
    api.put('/postresult/:id', _authMiddleware.authenticate, function (req, res) {
        _topicResults2.default.findById(req.params.id, function (err, topicresult) {

            if (err) {
                res.send(err);
            }

            topicresult.achieved = req.body.achieved;
            topicresult.topic = req.body.topic;
            topicresult.id = req.body.id;
            topicresult.subTopicResults = req.body.subTopicResults;

            topicresult.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Topic Updated" });
            });
        });
    });

    //Get all results for a user
    api.get('/getbyid/:id', _authMiddleware.authenticate, function (req, res) {
        _topicResults2.default.find({ id: req.params.id }, function (err, topicresult) {
            if (err) {
                res.send(err);
            }
            res.json(topicresult);
        });
    });

    //Get all results and populate by ID - nested population
    //https://stackoverflow.com/questions/28179720/mongoose-populate-nested-array
    api.get('/getandpopulatebyid/:id', _authMiddleware.authenticate, function (req, res) {
        _topicResults2.default.find({ id: req.params.id }).populate({ path: 'subTopicResults', model: 'SubTopicResult', populate: { path: 'subtopic', model: 'SubTopic', populate: { path: 'parentTopic', model: 'Topic' } } }).populate('id').populate('topic').populate('subtopic').exec(function (err, topicresults) {
            if (err) {
                res.send(err);
            }
            res.json(topicresults);
        });
    });

    return api;
};

// .populate('subTopicResults')
// .populate('id')
// .populate('topic')
// .populate('subtopic')


//middleware


//models
//# sourceMappingURL=topicResults.js.map