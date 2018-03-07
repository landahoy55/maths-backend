import mongoose from 'mongoose';
import { Router } from 'express';
import Topic from '../model/topic';

export default ({config, db}) => {
    let api = Router();

    // // v1/topics/
    // //GET a topic by title
    // api.get('/get/:title', (req, res) => {

    // });

    // //GET all topics
    api.get('/', (req, res) => {

        // Topic.findOne({title:'Numbers'})
        //     // .populate('subTopics')
        //     .exec({
        //         function (err, topic) {
        //             if (err) {
        //                 res.send(err);
        //             }
        //             console.log(JSON.stringify(topic));
        //             res.json(topic)
        //         }
        //     });

        //TODO: Reinsert data via Mongoose.
        //Schema can't match schemaless docs.

        Topic.find({})
            // .populate('subTopics')
            .populate({path:'subTopics', model:'SubTopic', populate: {path: 'parentTopic', model: 'Topic'}})
            .exec(
            function(err, topic) {
                if (err) {
                    res.send(err)
                }
                console.log(JSON.stringify(topic));
                res.json(topic);
            }
        );

        // .populate({path: 'subTopicResults', model: 'SubTopicResult', populate: {path: 'subtopic', model: 'SubTopic', populate: {path: 'parentTopic', model: 'Topic'}}})

        // Topic.findOne({}, (err, topics) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     console.log(JSON.stringify(topics));
        //     res.json(topics);
        // });
    });
    return api;
};