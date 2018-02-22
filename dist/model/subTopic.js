'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var subTopicSchema = new Schema({
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
    questions: [_question2.default.schema]
});

module.exports = _mongoose2.default.model('SubTopic', subTopicSchema);
//# sourceMappingURL=subTopic.js.map