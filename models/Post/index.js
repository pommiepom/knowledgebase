const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false);

const postSchema = Schema({
	createdBy: {
		// type: mongoose.Schema.Types.ObjectId, 
		type: String, 
		ref: 'User',
		require: true
	},
	createdTime: {
		type: Date,
		default: null
		// require: true
	},
	lastUpdate: {
		type: Date,
		default: null,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	detail: {
		type: String,
		require: true
	},
	category: {
		type: String
	},
	deleted: {
		type: Number,
		default: 0,
		require: true
	},
	delDate: {
		type: Date,
		default: null,
		require: true
	}
	// attachment : [{
	//     data: Buffer, 
	//     contentType: String
	// }]
})

module.exports = mongoose.model('Post', postSchema)