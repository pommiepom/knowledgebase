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
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    displayname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    // profilePic: {
    //     data: Buffer,
    //     contentType: String
    // },
    aboutme: {
        type: String
    },
    level: {
        type: String,
        enum : ['user','admin'],
        default: 'user',
        require: true
    },
    remember: {
        type: Boolean,
        default: false
    },
    id: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)