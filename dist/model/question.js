'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _answer = require('./answer');

var _answer2 = _interopRequireDefault(_answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId

//For embedded documents the embedded schema must be created in the same file.

// let answerSchema = new Schema ({
//     answer: String
// });

var questionSchema = new Schema({
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
    answers: [_answer2.default.schema]
});

module.exports = _mongoose2.default.model('Question', questionSchema);
//# sourceMappingURL=question.js.map