const Posts = require('../../models/Post')
const moment = require('moment');

exports.add = add = (props) => {
	const post = new Posts({
		createdBy: props.createdBy,
		title: props.title,
		detail: props.detail,
		category: props.category,
		date: moment().format('YYYY-MM-DD HH:mm:ss'),
		lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')
		// fileID: props.fileID
	})
	return post.save()
}

exports.list = list = (query, skip, limit) => {
	return Posts.find(query, null, { limit, skip })
				.sort({date: 'desc'})
				.populate('createdBy', 'username')	
				.exec()
}

exports.update = update = (query, update) => {
	return Posts.findOneAndUpdate(query, update, { new: true })
}

exports.del = del = (query, update) => {
	return Posts.findOneAndUpdate(query, { $set: update }, { new: true })    
}

exports.count = count = () => {
	return Posts.countDocuments({ deleted: 0 });
}