const Comments = require('../../models/Comment')
const Likes = require('../../models/Like')
const Like = require('../Like')

var mongoose = require('mongoose');
var moment = require('moment')

exports.add = add = (props) => {
	const comment = new Comments({
		postID: props.postID,
		createdBy: props.createdBy,
		message: props.message,
		date: moment().format('YYYY-MM-DD HH:mm:ss')
		// id: props.id
	})
	return comment.save()
}

exports.list = list = (query) => {
	return Comments.find(query)
				// .populate('postID')
				// .populate('createdBy')
				.exec()
}

exports.del = del = (query, update) => {
	console.log(query);
	
	return Comments.findOneAndUpdate(query, { $set: update }, {new: true})  
}

exports.delAll = delAll = (query, update) => {
	console.log(query);
	return Comments
			.find(query) // all comment
			.then(doc => {
				console.log(doc);
				if (doc.length != 0) {
					var arrCommentID = []
					for (let i = 0; i < doc.length; i++) {
						arrCommentID[i] = { commentID: String(doc[i]._id) }
						// console.log(doc[i]);
					}
					console.log(arrCommentID);
					console.log('doc');
					console.log(doc);
					const delComment = Comments.updateMany({ $or: doc }, { $set: update }, {new: true})
					const delLike = Likes.find({ $or: arrCommentID }, '_id')
										.then(doc => {
											// console.log(doc);
											return Like.del({ $or: doc })
										})
	
					return Promise.all([delComment, delLike])
								.then(doc => {
									console.log(doc);
									return doc
								})
				}
				
			})
}