const Post = require('../../models/Post copy')

exports.add = add = (props) => {
    const post = new Post({
        createdBy: props.createdBy,
        title: props.title,
        detail: props.detail,
        category: props.category,
        id: props.id,
        likedBy: props.likedBy
        // ,attachment: props.attachment
    })
    return post.save()
}

exports.list = list = (query) => {
    return Post.find(query, { deleted: 0 }).exec()
    // .populate('createdBy')
    
}

exports.update = update = (query, update) => {
    return Post.findOneAndUpdate(query, { $set: update, lastUpdate: Date.now() })
}

exports.del = del = (query, update) => {
    return Post.findOneAndUpdate(query, { $set: update }, { new: true })    
}