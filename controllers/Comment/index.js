const Comment = require('../../models/Comment')

exports.add = add = (props) => {
    const comment = new Comment({
        postID: props.postID,
        createdBy: props.createdBy,
        message: props.message,
        id: props.id
    })
    return comment.save()
}

exports.list = list = (query) => {
    return Comment.find(query, { deleted: 0})
                // .populate('postID')
                // .populate('createdBy')
                .exec()
}

exports.del = del = (query, update) => {
    return Comment.findOneAndUpdate(query, { $set: update }, {new: true})    
}