const Files = require('../../models/File')
const Posts = require('../../models/Post')

exports.add = add = (doc, time) => {
	const file = { name: doc.filename, date: time }

	return Files.insertMany(file);
}

exports.list = list = (query) => {
	return Files.find(query)
		// .populate('postID')
		// .populate('commentID')
		// .populate('likedBy')
		.exec()
}

exports.delandUpdate = del = (fileID, post_id) => {
	const fileDel = Files.deleteOne({ _id: fileID })
	const postUpdate = Posts.findOneAndUpdate(post_id, { $pull: { fileID: fileID }}, { new: true })

	return Promise.all([fileDel, postUpdate])
}