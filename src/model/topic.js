import mongoose from 'mongoose';
import Subtopic from './subTopic';
let Schema = mongoose.Schema;

let topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    subTopics: [{type: Schema.Types.ObjectId, ref: 'SubTopic'}]
    // subTopics: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Topic', topicSchema);