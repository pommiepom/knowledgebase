const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false);

const likeSchema = Schema({
    postID: {
        type: String, 
        ref: 'Post'
    },
    commentID: {
        type: String, 
        ref: 'Comment'
    },    
    likedBy: {
        type: String, 
        ref: 'User',
        require: true
    },
    date: {
        type: Date,
        default: null,
        require: true
    } 
})

module.exports = mongoose.model('Like', likeSchema)