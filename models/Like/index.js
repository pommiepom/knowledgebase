const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const likeSchema = Schema({
    postID: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: String,
        // ref: 'Post'
    },
    commentID: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: String,
        // ref: 'Comment'
    },    
    likedBy: {
        // type: mongoose.Schema.Types.ObjectId, 
        type: String,
        // ref: 'User',
        require: true
    },
    date: {
        type: Date,
        default: Date.now(),
        require: true
    },
    id: {
        type: String
    }
})

module.exports = mongoose.model('Like', likeSchema)