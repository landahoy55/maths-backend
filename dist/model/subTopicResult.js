'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _subTopic = require('./subTopic');

var _subTopic2 = _interopRequireDefault(_subTopic);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var subTopicResultSchema = new Schema({
    achieved: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    subtopic: {
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'SubTopic',
        required: true
    },
    id: {
        type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Account',
        required: true
    }
});

module.exports = _mongoose2.default.model('SubTopicResult', subTopicResultSchema);
//# sourceMappingURL=subTopicResult.js.map