import { Router } from 'express';
import DailyChallenge from '../model/dailyChallenge';
import Answer from '../model/answer';
import Question from '../model/question';

var DateOnly = require('dateonly');



export default ({ config, db }) => {

    let api = Router()

    //Date as YEAR MONTH DAY 20180313 3/13/2018
    api.get('/today/:id', (req, res) => {

        var dateAsInt = parseInt(req.params.id)
        var date = new DateOnly(dateAsInt)

        console.log(date.toString())
        console.log(date.toDate())

        DailyChallenge.findOne({ playdate: date} , (err, dailychallenge) => {
            if (err) {
                res.send(err);
            }
            res.json(dailychallenge);
        });

    });


    api.post('/add', (req, res) => {

        console.log(req.body)

        let newDailyChallenge = new DailyChallenge();

        //loop over questions in body
        req.body.questions.forEach(question => {
            
            //create question
            let newQuestion = new Question()
            
            //assign q and a
            newQuestion.question = question.question
            newQuestion.correctAnswer = question.correctAnswer

            //create answers
            question.answers.forEach(answer => {

                //create new answer
                let newAnswer = new Answer()
                newAnswer.answer = answer.answer

                //assign embedded answer
                newQuestion.answers.push(newAnswer)

            });

            newDailyChallenge.questions.push(newQuestion)

        });

        //assign type, description and date
        
        newDailyChallenge.type = req.body.type
        newDailyChallenge.description = req.body.description
        
        // var date = new DateOnly(20180313)
        var date = new DateOnly(req.body.playdate)
        //var date = new DateOnly(eq.body.playdate)
        newDailyChallenge.playdate = date

        console.log("****** POSTED DATE", req.body.playdate)
        console.log("****** ASSIGNED DATE", date)

        newDailyChallenge.save(err => {
            if (err) {
                res.send(err)
            }
            res.send(newDailyChallenge)
        });
    });

    return api;

}