const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user',
        require: true
    },
    remember: {
        type: Number,
        default: 0,
        require: true
    },
    deleted: {
        type: Number,
        default: 0,
        require: true
    },
    delDate: {
        type: Date,
        default: null,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema)