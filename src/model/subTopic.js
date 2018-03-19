import mongoose from 'mongoose';
import Question from './question';
import Topic from './topic';
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
    questions: [Question.schema],
    parentTopic: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Topic'
    },
    quizType: {
        type: String
    }
});

module.exports = mongoose.model('SubTopic', subTopicSchema);