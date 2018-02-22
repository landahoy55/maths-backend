import mongoose from 'mongoose';
import { Router } from 'express';
import Question from '../model/question';

export default ({config, db}) => {
    let api = Router();

    //CREATE - Post a question
    // ' v1/questions/add
    
    // Handling arrays or lists - https://stackoverflow.com/questions/28764822/req-body-cant-be-read-as-an-array
    api.post('/add', (req, res) => {

        //created new question
        let newQuestion = new Question();
        newQuestion.question = req.body.question;
        newQuestion.correctAnswer = req.body.answer;
    
        //loop over array and push each elemen onto the mongoose schema    
        req.body.answers.forEach(element => {
            console.log(element.answer)
            newQuestion.answers.push(element);
        });

        // console.log(JSON.stringify(newQuestion));
        //save and return message
        newQuestion.save(err => {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Question Saved'});
        });
    
    });
    return api;
};