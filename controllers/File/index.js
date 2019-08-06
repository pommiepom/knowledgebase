const Files = require('../../models/File')
const Posts = require('../../models/Post')
// const moment = require('moment');

// exports.add = add = (props) => {
//     const file = new Files({
//         name: props.name,
//         date: moment().format('YYYY-MM-DD HH:mm:ss'),
//     })
//     return file.save()
// }

exports.add = add = (doc, time) => {
	const file = { name: doc.filename, date: time}

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
	// if (!Array.isArray(fileID)) {
	// 	fileID = [fileID]
	// }
	const fileDel = Files.deleteOne({ _id: fileID })
	const postUpdate = Posts.findOneAndUpdate(post_id, { $pull: { fileID: fileID } }, { new: true })

	return Promise.all([fileDel, postUpdate])
}