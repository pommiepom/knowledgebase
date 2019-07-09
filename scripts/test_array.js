require('../libs/MongoDBConnect')()
const Promise = require('promise');

// const Comment = require('../models/Comment')
const Posts = require('../models/Post copy')

// post_ID = parseInt(Math.random() * 499).toString()
// console.log("post id: " + post_ID)

/* array: 1.606ms
array2: 0.449ms
array3: 0.123ms 
*/


/* -- get post title -- array*/
// const promise1 = new Promise((resolve, reject) => {
// 	console.time("array");
// 	Posts
// 		.find({}, 'title', (err, docs) => {
// 			if (docs) {
// 				resolve(docs)
// 			}
// 			console.error(err);			
// 			return ;
// 		})
// })

// promise1
// 	.then(console.timeEnd("array"))
// 	.then(docs => {
// 		console.log(docs);
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})





/* -- get post title, num(like) -- array*/

post_ID = "5000"

const promise2 = new Promise((resolve, reject) => {
	Posts
		.find({ id: post_ID }, (err, docs) => {
			if (err) {
				console.error(err)
				return
			}
			// resolve(docs[0])
			resolve('Done')
		})
})

const promise3 = new Promise((resolve, reject) => {
	Posts
		.find({ id: post_ID }, 'likedBy', (err, arr) => {
			if (err) {
				console.error(err)
				return
			}
			resolve(arr[0].likedBy.length)
		})
})

console.time("array2");
Promise.all([promise2, promise3])
	.then(console.timeEnd("array2"))
	.then(result => {
		console.log(result)
	})
	.catch(err => {
		console.error(err)
	})





/* -- get post title, num(like) -- array*/

// const promise4 = new Promise((resolve, reject) => {
// 	Posts
// 		.find({ id: post_ID }, 'likedBy', (err, arr) => {
// 			if (err) {
// 				console.error(err)
// 				return
// 			}
// 			resolve(arr[0].likedBy)
// 		})
// })


// console.time("array3");
// promise4
// 	.then(console.timeEnd("array3"))
// 	.then(result => {
// 		console.log(result)
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})