import mongoose from 'mongoose';
import { Router } from 'express';

//import models
import Answer from '../model/answer';
import Question from '../model/question';
import SubTopic from '../model/subTopic';
import Topic from '../model/topic';

export default ({config, db}) => {
    let api = Router();

    //update field name - once schema has been updated
    api.post('/updatesubfieldname', (red, res) => {
        SubTopic.updateMany({}, {$rename:{"topic":"parentTopic"}}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });


    //adding new field - once schema has been updated
    api.post('/updatetopics', (req, res) => {
        SubTopic.update({},{topic: '5a9e77f414a7391e4f5d49f0'},{multi: true}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });


    api.post('/makemaintopic', (req, res) => {

        var sub1 = mongoose.Types.ObjectId("5a9e77f414a7391e4f5d49f0");
        var sub2 = mongoose.Types.ObjectId("5a9e78cf506f551ebc66b20e");
        var sub3 = mongoose.Types.ObjectId("5a9e7a0c0399351f8d86b8d7");
        var sub4 = mongoose.Types.ObjectId("5a9e7bbac3bf5e2039d8d30c");
        var sub5 = mongoose.Types.ObjectId("5a9e7d88e2536e20ef885f34");

        new Topic({
            title: "Percentages",
            description: "Work out parts of amounts",
            subTopics: [
                sub1,
                sub2,
                sub3,
                sub4,
                sub5
            ]
        }).save(function(err, topic){
            if(err) res.json(err);
            else {
                    res.json({"Saved": topic});
            }
        });
    });

    api.post('/makeSubtopic', (req, res) => {

        //sub 1
        var answer1a = new Answer({answer: "50%"});
        var answer2a = new Answer({answer: "25%"});
        var answer3a = new Answer({answer: "20%"});
        var answer4a = new Answer({answer: "100%"});
        var question1 = new Question({
            question: "The probability of flipping a coin and getting heads is",
            correctAnswer: "100%",
            answers: [
            answer1a,
            answer2a,
            answer3a,
            answer4a
        ]});
        var answer1b = new Answer({answer: "1 in 6"});
        var answer2b = new Answer({answer: "1 in 2"});
        var answer3b = new Answer({answer: "1 in 4"});
        var answer4b = new Answer({answer: "1 in 5"});
        var question2 = new Question({
            question: "Rolling a dice and getting a 3 is",
            correctAnswer: "1 in 6",
            answers: [
            answer1b,
            answer2b,
            answer3b,
            answer4b
        ]});

        var answer1c = new Answer({answer: "100%"});
        var answer2c = new Answer({answer: "50%"});
        var answer3c = new Answer({answer: "1%"});
        var answer4c = new Answer({answer: "10%"});
        var question3 = new Question({
            question: "If something is certain the probability is",
            correctAnswer: "100%",
            answers: [
            answer1c,
            answer2c,
            answer3c,
            answer4c
        ]});

        var answer1d = new Answer({answer: "1"});
        var answer2d = new Answer({answer: "0"});
        var answer3d = new Answer({answer: "2"});
        var answer4d = new Answer({answer: "3"});
        var question4 = new Question({
            question: "How many outcomes are there if you flip a coin",
            correctAnswer: "2",
            answers: [
            answer1d,
            answer2d,
            answer3d,
            answer4d
        ]});

        var answer1e = new Answer({answer: "Sun hat"});
        var answer2e = new Answer({answer: "Umbrella"});
        var answer3e = new Answer({answer: "Sun cream"});
        var answer4e = new Answer({answer: "Light jacket"});
        var question5 = new Question({
            question: "What would you pick up if there is 85% chance of rain?",
            correctAnswer: "Umbrella",
            answers: [
            answer1e,
            answer2e,
            answer3e,
            answer4e
        ]});

        new SubTopic({

            title: "Probability",
            description: "Measure certainty about future events with fractions or per cent. A 50% chance of rain",
            stage: 5,
            questions: [
                question1,
                question2,
                question3,
                question4,
                question5
            ]
        }).save(function(err, subTopic){
            if(err) res.json(err);
            else {
                res.json({"Saved": subTopic});
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