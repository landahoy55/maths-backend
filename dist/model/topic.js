'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _subTopic = require('./subTopic');

var _subTopic2 = _interopRequireDefault(_subTopic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //    subTopics: [{type: Schema.Types.ObjectId, ref: 'SubTopic'}]
    subTopics: [Schema.Types.ObjectId]
});

module.exports = _mongoose2.default.model('Topic', topicSchema);
//# sourceMappingURL=topic.js.map