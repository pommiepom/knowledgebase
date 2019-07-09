require('../libs/MongoDBConnect')()

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const Comment = require('../models/Comment')
const Post = require('../models/Post')

// Comment.findOneAndUpdate(query, { $set: update, $inc: { order: 1 }})
// .then(doc => {
//     console.log(doc);
// })
// .catch(err => {
//     console.log(err);
// })

////////////////////////////////////

const query = { _id: "5d1c6fc3f074ff44c81938a5"}
const update = { delDate: Date.now(), deleted: 1}

const delPost = Post.findOneAndUpdate(query, { $set: update }, { new: true})
const delComment = Comment.findOneAndUpdate({ postID: query._id }, { $set: update }, { new: true })

Promise.all([delPost, delComment])
	.then(doc => {
		console.log(doc)
	})

//////////////////////////////////

// const delPost = new Promise((resolve, reject) => {
// 	resolve(1)
// })

// const delComment = new Promise((resolve, reject) => {
// 	resolve(2)
// })

// Promise.all([delPost, delComment])
// 	.then(doc => {
// 		console.log(doc)
// 	})