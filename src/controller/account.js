import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';

import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate} from '../middleware/authMiddleware';

export default ({ config, db }) => {
    let api = Router();

    //Register
    // v1/account
    api.post('/register', (req, res) => {
        Account.register(new Account(  {username: req.body.email, name: req.body.name}),
            req.body.password,
            function(err, account) {
                if (err) {
                    res.send(err);
                }
                passport.authenticate(
                    'local', {
                        session: false
                    })(req, res, () => {
                        res.status(200).send('Successfully created account');
                });
        });
    });

    //Login
    // v1/account/login
    api.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
        }), generateAccessToken, respond
    );

    //Logout
    // v1/account/logout
    api.post('/logout', authenticate, (req, res) => {
        res.logout();
        res.status(200).send('Successfully logged out');
    })

    //Request user info - get ID
    api.get('/me', authenticate, (req, res) => {
        res.status(200).json(req.user);
    });

    //Retreive user information - ie, name
    api.get('/details', authenticate, (req, res) => {
        Account.findById(req.params.id, (err, account) => {
            if (err) {
                res.send(err)
            }
            res.json(account);
        });
    });

    return api;
}