const Posts = require('../../models/Post')
const moment = require('moment');

exports.add = add = (props) => {
	const post = new Posts({
		createdBy: props.createdBy,
		title: props.title,
		detail: props.detail,
		category: props.category,
		createdTime: moment().format('YYYY-MM-DD HH:mm:ss'),
		lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')
		// fileID: props.fileID
	})
	return post.save()
}

exports.list = list = (query) => {
	return Posts.find(query).exec()
	// .populate('createdBy')
	
}

exports.update = update = (query, update) => {
	return Posts.findOneAndUpdate(query, update, { new: true })
}

exports.del = del = (query, update) => {
	return Posts.findOneAndUpdate(query, { $set: update }, { new: true })    
}