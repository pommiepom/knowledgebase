const Like = require('../../models/Like')

const moment = require('moment')

exports.add = add = (props) => {
    const like = new Like({
        postID: props.postID,
        commentID: props.commentID,
        likedBy: props.likedBy,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
        // id: props.id
    })
    return like.save()
}

exports.list = list = (query) => {
    return Like.find(query)
                // .populate('postID')
                // .populate('commentID')
                // .populate('likedBy')
                .exec()
}

exports.del = del = (query) => {
    return Like.deleteMany(query)    
}