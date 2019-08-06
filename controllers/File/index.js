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
	console.log('file.add ', doc);
	// var arr = []
	// for (let i = 0; i < doc.length; i++) {
		const file = { name: doc.filename, date: time}
	// }
	return Files.insertMany(file);
}

// exports.add = add = (doc, time) => {
// 	var arr = []
// 	for (let i = 0; i < doc.length; i++) {
// 		arr[i] = { name: doc[i].filename, date: time}
// 	}
// 	return Files.insertMany(arr);
// }

exports.list = list = (query) => {
	return Files.find(query)
				// .populate('postID')
				// .populate('commentID')
				// .populate('likedBy')
				.exec()
}

exports.delandUpdate = del = (fileID, post_id) => {
	if (!Array.isArray(fileID)) {
		fileID = [fileID]
	}
	const fileDel = Files.deleteMany({ _id: fileID })
	const postUpdate = Posts.findOneAndUpdate(post_id, { $pullAll: { fileID: fileID } }, { new: true })

	return Promise.all([fileDel, postUpdate])
}