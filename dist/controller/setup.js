'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _answer = require('../model/answer');

var _answer2 = _interopRequireDefault(_answer);

var _question = require('../model/question');

var _question2 = _interopRequireDefault(_question);

var _subTopic = require('../model/subTopic');

var _subTopic2 = _interopRequireDefault(_subTopic);

var _topic = require('../model/topic');

var _topic2 = _interopRequireDefault(_topic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import models
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    api.post('/makemaintopic', function (req, res) {

        var sub1 = _mongoose2.default.Types.ObjectId("5a954598d87363290dd58fc5");
        var sub2 = _mongoose2.default.Types.ObjectId("5a9546b08e8d1b29877af6ee");
        var sub3 = _mongoose2.default.Types.ObjectId("5a9547f5ced0c62a1e74b9d8");
        var sub4 = _mongoose2.default.Types.ObjectId("5a95491bb7dc4c2aa0f7447f");
        var sub5 = _mongoose2.default.Types.ObjectId("5a954a498956bf2b2d1a5ef0");

        new _topic2.default({
            title: "Numbers",
            description: "Using number lines, decimals and negative numbers",
            subTopics: [sub1, sub2, sub3, sub4, sub5]
        }).save(function (err, topic) {
            if (err) res.json(err);else {
                res.json({ "Saved": topic });
            }
        });
    });

    api.post('/makeSubtopic', function (req, res) {

        //sub 1
        var answer1a = new _answer2.default({ answer: "The temperature outside" });
        var answer2a = new _answer2.default({ answer: "The weight of a baby" });
        var answer3a = new _answer2.default({ answer: "The length of a road" });
        var answer4a = new _answer2.default({ answer: "The age of a dog" });
        var question1 = new _question2.default({
            question: "Which of the following can be negative?",
            correctAnswer: "The temperature outside",
            answers: [answer1a, answer2a, answer3a, answer4a] });
        var answer1b = new _answer2.default({ answer: "The height of a person" });
        var answer2b = new _answer2.default({ answer: "The floor number in a car park" });
        var answer3b = new _answer2.default({ answer: "A bank account" });
        var answer4b = new _answer2.default({ answer: "A bill from the electric company" });
        var question2 = new _question2.default({
            question: "Which of the following can only be positive?",
            correctAnswer: "The height of a person",
            answers: [answer1b, answer2b, answer3b, answer4b] });

        var answer1c = new _answer2.default({ answer: "-£50" });
        var answer2c = new _answer2.default({ answer: "50" });
        var answer3c = new _answer2.default({ answer: "5" });
        var answer4c = new _answer2.default({ answer: "450" });
        var question3 = new _question2.default({
            question: "Dave has £200 in his account, he has to pay pay bill for £250. What will his account balance show?",
            correctAnswer: "-£50",
            answers: [answer1c, answer2c, answer3c, answer4c] });

        var answer1d = new _answer2.default({ answer: "-£50" });
        var answer2d = new _answer2.default({ answer: "£150" });
        var answer3d = new _answer2.default({ answer: "-£200" });
        var answer4d = new _answer2.default({ answer: "£50" });
        var question4 = new _question2.default({
            question: "Helen is overdrawn by £100, she pays in £50. What is her new balance?",
            correctAnswer: "-£50",
            answers: [answer1d, answer2d, answer3d, answer4d] });

        var answer1e = new _answer2.default({ answer: "-5" });
        var answer2e = new _answer2.default({ answer: "5" });
        var answer3e = new _answer2.default({ answer: "10" });
        var answer4e = new _answer2.default({ answer: "25" });
        var question5 = new _question2.default({
            question: "The temperature was 10 degrees earlier, but has dropped by 15 degrees. What is it now?",
            correctAnswer: "-5",
            answers: [answer1e, answer2e, answer3e, answer4e] });

        new _subTopic2.default({

            title: "Negative numbers",
            description: "Negative numbers, with a minus sign in front, are used to count below zero. -1 is one below 0",
            stage: 5,
            questions: [question1, question2, question3, question4, question5]
        }).save(function (err, subTopic) {
            if (err) res.json(err);else {
                res.json({ "Saved": subTopic });
            }
        });
    });

    return api;
};

//Numbers

// //sub 1
// var answer1a = new Answer({answer: "17"});
// var answer2a = new Answer({answer: "15"});
// var answer3a = new Answer({answer: "16"});
// var answer4a = new Answer({answer: "12"});
// var question1 = new Question({
//     question: "Counting on 5 from 12 is",
//     correctAnswer: "17",
//     answers: [
//     answer1a,
//     answer2a,
//     answer3a,
//     answer4a
// ]});
// var answer1b = new Answer({answer: "25"});
// var answer2b = new Answer({answer: "5"});
// var answer3b = new Answer({answer: "35"});
// var answer4b = new Answer({answer: "20"});
// var question2 = new Question({
//     question: "Counting back 3 from 7 is",
//     correctAnswer: "25",
//     answers: [
//     answer1b,
//     answer2b,
//     answer3b,
//     answer4b
// ]});

// var answer1c = new Answer({answer: "13"});
// var answer2c = new Answer({answer: "15"});
// var answer3c = new Answer({answer: "12"});
// var answer4c = new Answer({answer: "14"});
// var question3 = new Question({
//     question: "Counting on 9 from 4 is",
//     correctAnswer: "13",
//     answers: [
//     answer1c,
//     answer2c,
//     answer3c,
//     answer4c
// ]});

// var answer1d = new Answer({answer: "25"});
// var answer2d = new Answer({answer: "5"});
// var answer3d = new Answer({answer: "35"});
// var answer4d = new Answer({answer: "20"});
// var question4 = new Question({
//     question: "Counting on 10 from 15 is?",
//     correctAnswer: "25",
//     answers: [
//     answer1d,
//     answer2d,
//     answer3d,
//     answer4d
// ]});

// var answer1e = new Answer({answer: "25"});
// var answer2e = new Answer({answer: "35"});
// var answer3e = new Answer({answer: "21"});
// var answer4e = new Answer({answer: "20"});
// var question5 = new Question({
//     question: "Counting back 5 from 30 is",
//     correctAnswer: "25",
//     answers: [
//     answer1e,
//     answer2e,
//     answer3e,
//     answer4e
// ]});

// new SubTopic({

//     title: "Number line",
//     description: "To help think about sums, sketch a line. Draw humps along the line to show adding and subtracting",
//     stage: 1,
//     questions: [
//         question1,
//         question2,
//         question3,
//         question4,
//         question5
//     ]
// }).save(function(err, subTopic){
//     if(err) res.json(err);
//     else {
//         res.json({"Saved": subTopic});
//     }
// });
//# sourceMappingURL=setup.js.map