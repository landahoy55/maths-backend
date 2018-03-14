import mongoose from 'mongoose';
import Answer from './answer';
import Question from './question';
//mongoose-dateonly will store only dates and assist with timezones
//https://www.npmjs.com/package/mongoose-dateonly
var DateOnly = require('mongoose-dateonly')(mongoose);

let Schema = mongoose.Schema

let dailyChallengeSchema = new Schema({

//type for vc - string
//descrption - useful for messages? 
//date for playing - date?
//questions

type: {
    type: String
},
description: {
    type: String
},
//date
playdate: DateOnly, 
//embedded - just like subtopic
questions:[Question.schema]

});

module.exports = mongoose.model('DailChallenge', dailyChallengeSchema)