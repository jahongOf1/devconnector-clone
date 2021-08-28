const mongoose = require('mongoose'); //import mongoose module which connects mongoDB to rest of the backend

// remove avatar, remove this nidek to the PREMIUM service side
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema); //exports the model user so the rest of the backend can make use of this function