import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);