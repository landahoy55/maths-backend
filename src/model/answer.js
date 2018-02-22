//Not currently being used.

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let answerSchema = new Schema ({
    answer: String
});

module.exports = mongoose.model('Answer', answerSchema );