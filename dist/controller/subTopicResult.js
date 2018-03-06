'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _subTopic = require('../model/subTopic');

var _subTopic2 = _interopRequireDefault(_subTopic);

var _subTopicResult = require('../model/subTopicResult');

var _subTopicResult2 = _interopRequireDefault(_subTopicResult);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //post result
    api.post('/postresult', _authMiddleware.authenticate, function (req, res) {
        var newSubTopicResult = new _subTopicResult2.default();

        newSubTopicResult.achieved = req.body.achieved;
        newSubTopicResult.score = req.body.score;
        newSubTopicResult.subtopic = req.body.subtopic;
        newSubTopicResult.id = req.body.id;

        newSubTopicResult.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'subtopic result saved' });
        });
    });

    //update result - fetch result by id, then update all params
    api.put('/postresult/:id', _authMiddleware.authenticate, function (req, res) {
        _subTopicResult2.default.findById(req.params.id, function (err, subtopicresult) {
            if (err) {
                res.send(err);
            }
            subtopicresult.achieved = req.body.achieved;
            subtopicresult.score = req.body.score;
            subtopicresult.subtopic = req.body.subtopic;
            subtopicresult.id = req.body.id;
            subtopicresult.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "SubTopic Updated" });
            });
        });
    });

    //get all results - based on user
    api.get('/getbyid/:id', _authMiddleware.authenticate, function (req, res) {
        _subTopicResult2.default.find({ id: req.params.id }, function (err, subtopicresults) {
            if (err) {
                res.send(err);
            }
            res.json(subtopicresults);
        });
    });

    //get all results - and populate - by user
    api.get('/getandpopulatebyid/:id', _authMiddleware.authenticate, function (req, res) {
        _subTopicResult2.default.find({ id: req.params.id }).populate('subtopic').populate('id').exec(function (err, subtopicresults) {
            if (err) {
                res.send(err);
            }
            res.json(subtopicresults);
        });
    });

    return api;
};

// SubTopicResult.find({ id:req.params.id }, (err, subtopicresults) => {
//     if (err) {
//         res.send(err);
//     }
//     res.json(subtopicresults)
// });
// Topic.find({}).populate('subTopics').exec(
//     function(err, topic) {
//         if (err) {
//             res.send(err)
//         }
//         console.log(JSON.stringify(topic));
//         res.json(topic);
//     }
// );


//Auth middleware


//import models
//# sourceMappingURL=subTopicResult.js.map