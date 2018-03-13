//for storing device id
//anonymised

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let deviceIDSchema = new Schema ({
    deviceid: String
});

module.exports = mongoose.model('Device', deviceIDSchema);