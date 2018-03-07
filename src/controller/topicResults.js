import mongoose from 'mongoose';
import { Router } from 'express';

//models
import Topic from '../model/topic';
import TopicResult from '../model/topicResults';

//middleware
import { authenticate } from '../middleware/authMiddleware';

export default ({config, db}) => {
    let api = Router();
    
    //Post a topic result
    api.post('/postresult', authenticate, (req, res) => {
        let newTopicResult = new TopicResult();

        newTopicResult.achieved = req.body.achieved
        newTopicResult.topic = req.body.topic
        newTopicResult.id = req.body.id
        newTopicResult.subTopicResults = req.body.subTopicResults

        newTopicResult.save(err => {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Topic result saved'})
        })

    });

    //Update a topic
    api.put('/postresult/:id', authenticate, (req, res) => {
        TopicResult.findById(req.params.id, (err, topicresult) => {
            
            if (err) {
                res.send(err)
            }

            topicresult.achieved = req.body.achieved
            topicresult.topic = req.body.topic
            topicresult.id = req.body.id
            topicresult.subTopicResults = req.body.subTopicResults

            topicresult.save(err => {
                if (err) {
                    res.send(err)
                }
                res.json({message: "Topic Updated"})
            })
        });
    });

    //Get all results for a user
    api.get('/getbyid/:id', authenticate, (req, res) => {
        TopicResult.find({ id:req.params.id} , (err, topicresult) => {
            if (err) {
                res.send(err);
            }
            res.json(topicresult);
        });
    });

    //Get all results and populate by ID - nested population
    //https://stackoverflow.com/questions/28179720/mongoose-populate-nested-array
    api.get('/getandpopulatebyid/:id', authenticate, (req, res) => {
        TopicResult.find({ id:req.params.id })
            .populate({path: 'subTopicResults', model: 'SubTopicResult', populate: {path: 'subtopic', model: 'SubTopic'}})
            .populate('id')
            .populate('topic')
            .populate('subtopic')
            .exec(
            (err, topicresults) => {
                if (err) {
                    res.send(err);
                }
                res.json(topicresults)
            }
        )
    });

    return api;
};

// .populate('subTopicResults')
// .populate('id')
// .populate('topic')
// .populate('subtopic')