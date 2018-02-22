import mongoose from 'mongoose';
import Question from './question'
let Schema = mongoose.Schema;

let subTopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stage: {
        type: Number,
        required: true
    },
    questions: [Question.schema]
});

module.exports = mongoose.model('SubTopic', subTopicSchema);