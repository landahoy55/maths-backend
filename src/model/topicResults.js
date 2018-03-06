import mongoose from 'mongoose';
import SubTopic from './subTopic';
import Account from './account';
import Topic from './topic';
import SubTopicResult from './subTopicResult'

let Schema = mongoose.Schema;

let topicResultSchema = new Schema({
    achieved: {
        type: Boolean,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Topic',
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    subTopicResults: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'SubTopicResult',
            required: true
        }
    ]
});

module.exports = mongoose.model('TopicResult', topicResultSchema);