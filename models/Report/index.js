const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const schema = Schema({
    reportedBy: {
        type: String, 
        // type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    },
    postID: {
        type: String, 
        // type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        require: true
    },
    commentID: {
        type: String, 
        // type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post',
        require: true
    },
    issue: {
        type: String,
        require: true
    },
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
        default: "admin@klb.com",
        require: true
    }
})

module.exports = mongoose.model('Report', schema)