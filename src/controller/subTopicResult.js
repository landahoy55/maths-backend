import mongoose from 'mongoose';
import { Router } from 'express';

//import models
import Subtopic from '../model/subTopic';
import SubTopicResult from '../model/subTopicResult';

//Auth middleware
import { authenticate } from '../middleware/authMiddleware';

export default ({config, db}) => {
    let api = Router();

    //post result
    api.post('/postresult', authenticate, (req, res) => {
        let newSubTopicResult = new SubTopicResult();
        
        newSubTopicResult.achieved = req.body.achieved
        newSubTopicResult.score = req.body.score
        newSubTopicResult.subtopic = req.body.subtopic
        newSubTopicResult.id = req.body.id

        newSubTopicResult.save(err => {
            if (err) {
                res.send(err)
            }
            res.json({ message: 'subtopic result saved' });
        });
    });

    //update result - fetch result by id, then update all params
    api.put('/postresult/:id', authenticate, (req, res) => {
        SubTopicResult.findById(req.params.id, (err, subtopicresult) => {
            if (err) {
                res.send(err)
            }
            subtopicresult.achieved = req.body.achieved
            subtopicresult.score = req.body.score
            subtopicresult.subtopic = req.body.subtopic
            subtopicresult.id = req.body.id
            subtopicresult.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({message: "SubTopic Updated"});
            })
        })
    });

    //get all results - based on user
    api.get('/getbyid/:id', authenticate, (req, res) => {
        SubTopicResult.find({ id:req.params.id }, (err, subtopicresults) => {
            if (err) {
                res.send(err);
            }
            res.json(subtopicresults);
        });
    });

    //get all results - and populate - by user
    api.get('/getandpopulatebyid/:id', authenticate, (req, res) => {
        SubTopicResult.find({ id:req.params.id }).populate('subtopic').populate('id').exec(
            (err, subtopicresults) => {
                if (err) {
                    res.send(err);
                }
                res.json(subtopicresults)
            }
        )
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