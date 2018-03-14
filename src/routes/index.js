import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initaliseDb from '../db';


import account from '../controller/account';
import question from '../controller/question';
import topic from '../controller/topic';
import setup from '../controller/setup';
import subtopicresult from '../controller/subTopicResult';
import topicresult from '../controller/topicResults';
import apns from '../controller/apns';
import dailyChallenge from '../controller/dailyChallenge'

let router = express();

//connected to db
initaliseDb(db => {

    //internal  middleware
    router.use(middleware({config, db}));
        
    //api routes
    
    router.use('/account', account({config, db}));
    router.use('/question', question({config, db}));
    router.use('/topic', topic({config, db}));
    router.use('/setup', setup({config, db}));
    router.use('/subtopicresult', subtopicresult({config, db}));
    router.use('/topicresult', topicresult({config, db}));
    router.use('/apns', apns({config, db}));
    router.use('/dailychallenge', dailyChallenge({config, db}));

});

export default router;