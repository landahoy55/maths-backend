'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _subTopic = require('./subTopic');

var _subTopic2 = _interopRequireDefault(_subTopic);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _topic = require('./topic');

var _topic2 = _interopRequireDefault(_topic);

var _subTopicResult = require('./subTopicResult');

var _subTopicResult2 = _interopRequireDefault(_subTopicResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var topicResultSchema = new Schema({
    achieved: {
        type: Boolean,
        required: true
    },
    topic: {
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Topic',
        required: true
    },
    id: {
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    subTopicResults: [{
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'SubTopicResult',
        required: true
    }]
});

module.exports = _mongoose2.default.model('TopicResult', topicResultSchema);
//# sourceMappingURL=topicResults.js.map