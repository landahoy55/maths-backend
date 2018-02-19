import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initaliseDb from '../db';

import restaurant from '../controller/restaurant';
import account from '../controller/account';

let router = express();

//connected to db
initaliseDb(db => {

    //internal  middleware
    router.use(middleware({config, db}));
        
    //api routes
    router.use('/restaurant', restaurant({config, db}));
    router.use('/account', account({config, db}));

});

export default router;