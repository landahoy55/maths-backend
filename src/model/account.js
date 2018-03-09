import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

//username is set in passport
let Account = new Schema({
    email: String,
    //added name
    name: String,
    password: String
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);