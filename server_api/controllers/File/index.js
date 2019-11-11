const Files = require('../../models/File')

exports.add = add = (doc, time) => {
	const file = { name: doc.filename, date: time, path: doc.destination + '/' }

	return Files.insertMany(file);
}

exports.list = list = (query) => {
	return Files.find(query)
		.exec()
}

exports.delandUpdate = del = (fileID) => {
	return Files.deleteOne({ _id: fileID })
}