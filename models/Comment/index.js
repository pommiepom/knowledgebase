const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false);

const commentSchema = Schema({
    postID: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: String, 
        ref: 'Post',
        require: true
    },
    createdBy: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: String, 
        ref: 'User',
        require: true
    },    
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: null,
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

module.exports = mongoose.model('Comment', commentSchema)