'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _question = require('../model/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //CREATE - Post a question
    // ' v1/questions/add

    // Handling arrays or lists - https://stackoverflow.com/questions/28764822/req-body-cant-be-read-as-an-array
    api.post('/add', function (req, res) {

        //created new question
        var newQuestion = new _question2.default();
        newQuestion.question = req.body.question;
        newQuestion.correctAnswer = req.body.answer;

        //loop over array and push each elemen onto the mongoose schema    
        req.body.answers.forEach(function (element) {
            console.log(element.answer);
            newQuestion.answers.push(element);
        });

        // console.log(JSON.stringify(newQuestion));
        //save and return message
        newQuestion.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Question Saved' });
        });
    });
    return api;
};
//# sourceMappingURL=question.js.map