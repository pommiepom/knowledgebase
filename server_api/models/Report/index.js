const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);
require('dotenv').config()

const schema = Schema({
    reportedBy: {
        type: String, 
        ref: 'User',
        require: true
    },
    postID: {
        type: String, 
        ref: 'Post',
        require: true
    },
    // commentID: {
    //     type: String, 
    //     ref: 'Post',
    //     require: true
    // },
    // issue: {
    //     type: String,
    //     require: true
    // },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: null,
        require: true
    },
    adminEmail: {
        type: String,
        default: process.env.adminEmail,
        require: true
    }
})

module.exports = mongoose.model('Report', schema)