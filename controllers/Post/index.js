const Post = require('../../models/Post')
var moment = require('moment');

exports.add = add = (props) => {
	const post = new Post({
		createdBy: props.createdBy,
		title: props.title,
		detail: props.detail,
		category: props.category,
		createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
		lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')
		// id: props.id
		// ,attachment: props.attachment
	})
	return post.save()
}

exports.list = list = (query) => {
	return Post.find(query).exec()
	// .populate('createdBy')
	
}

exports.update = update = (query, update) => {
	return Post.findOneAndUpdate(query, { $set: update, lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss') })
}

exports.del = del = (query, update) => {
	return Post.findOneAndUpdate(query, { $set: update }, { new: true })    
}