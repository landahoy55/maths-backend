import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import mongoose from 'mongoose';
import Account from '../model/account';

const TOKENTIME = 60*60*24*30 //30 days
const SECRET = "Th15 15 th3 S3cr3t";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id
    }, SECRET, {
        expiresIn: TOKENTIME
    });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

//check admin status
let checkAdmin = (req, res, next) => {
    Account.find({ email:req.body.email }, (err, account) => {
        
        console.log("In the middleware");

        if (err) {
            // return next(err);
            res.status(401).json({
                message: 'error'
            });
        }
    
        if (!account) {
            //doesn't exist
            res.status(401).json({
                message: 'account not found'
            });
        }
        
        if (!account.name) {
            //name property doesn't exist... change to admin
            res.status(401).json({
                message: 'no name property'
            });
        }
    
        //hand over to passport
        next();
    
    });
}

module.exports = { authenticate, generateAccessToken, respond, checkAdmin}