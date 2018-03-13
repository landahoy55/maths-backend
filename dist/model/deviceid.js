'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; //for storing device id
//anonymised

var deviceIDSchema = new Schema({
    deviceid: String
});

module.exports = _mongoose2.default.model('Device', deviceIDSchema);
//# sourceMappingURL=deviceid.js.map