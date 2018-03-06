import mongoose from 'mongoose';
import Subtopic from './subTopic';
import Account from './account';

let Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId

let subTopicResultSchema = new Schema({
    achieved: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number, 
        required: true
    },
    subtopic: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'SubTopic',
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
        required: true
    }
});

module.exports = mongoose.model('SubTopicResult', subTopicResultSchema);