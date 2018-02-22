import mongoose from 'mongoose';
import Answer from './answer';
let Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId

//For embedded documents the embedded schema must be created in the same file.

// let answerSchema = new Schema ({
//     answer: String
// });

let questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    //embed not relate
    // answers: [{type: ObjectId, ref: 'Answer'}]
    answers: [Answer.schema]
});

module.exports = mongoose.model('Question', questionSchema);