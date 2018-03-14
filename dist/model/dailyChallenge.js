'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _answer = require('./answer');

var _answer2 = _interopRequireDefault(_answer);

var _question = require('./question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mongoose-dateonly will store only dates and assist with timezones
//https://www.npmjs.com/package/mongoose-dateonly
var DateOnly = require('mongoose-dateonly')(_mongoose2.default);

var Schema = _mongoose2.default.Schema;

var dailyChallengeSchema = new Schema({

    //type for vc - string
    //descrption - useful for messages? 
    //date for playing - date?
    //questions

    type: {
        type: String
    },
    description: {
        type: String
    },
    //date
    playdate: DateOnly,
    //embedded - just like subtopic
    questions: [_question2.default.schema]

});

module.exports = _mongoose2.default.model('DailChallenge', dailyChallengeSchema);
//# sourceMappingURL=dailyChallenge.js.map