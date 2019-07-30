const Likes = require('../../models/Like')
const moment = require('moment')

exports.add = add = (props) => {
    const like = new Likes({
        postID: props.postID,
        commentID: props.commentID,
        likedBy: props.likedBy,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
    return like.save()
}

exports.list = list = (query) => {
    return Likes.find(query)
                // .populate('postID')
                // .populate('commentID')
                // .populate('likedBy')
                .exec()
}

exports.del = del = (query) => {
    return Likes.deleteMany(query)    
}