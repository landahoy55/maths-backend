'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _dailyChallenge = require('../model/dailyChallenge');

var _dailyChallenge2 = _interopRequireDefault(_dailyChallenge);

var _answer = require('../model/answer');

var _answer2 = _interopRequireDefault(_answer);

var _question = require('../model/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateOnly = require('dateonly');

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;


    var api = (0, _express.Router)();

    api.get('/today/:id', function (req, res) {

        var dateAsInt = parseInt(req.params.id);
        var date = new DateOnly(dateAsInt);

        console.log(date.toString());
        console.log(date.toDate());

        _dailyChallenge2.default.findOne({ playdate: date }, function (err, dailychallenge) {
            if (err) {
                res.send(err);
            }
            res.json(dailychallenge);
        });
    });

    api.post('/add', function (req, res) {

        console.log(req.body);

        var newDailyChallenge = new _dailyChallenge2.default();

        //loop over questions in body
        req.body.questions.forEach(function (question) {

            //create question
            var newQuestion = new _question2.default();

            //assign q and a
            newQuestion.question = question.question;
            newQuestion.correctAnswer = question.correctAnswer;

            //create answers
            question.answers.forEach(function (answer) {

                //create new answer
                var newAnswer = new _answer2.default();
                newAnswer.answer = answer.answer;

                //assign embedded answer
                newQuestion.answers.push(newAnswer);
            });

            newDailyChallenge.questions.push(newQuestion);
        });

        //assign type, description and date

        newDailyChallenge.type = req.body.type;
        newDailyChallenge.description = req.body.description;

        // var date = new DateOnly(20180313)
        var date = new DateOnly(req.body.playdate);
        //var date = new DateOnly(eq.body.playdate)
        newDailyChallenge.playdate = date;

        console.log("****** POSTED DATE", req.body.playdate);
        console.log("****** ASSIGNED DATE", date);

        newDailyChallenge.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send(newDailyChallenge);
        });
    });

    return api;
};
//# sourceMappingURL=dailyChallenge.js.map