require('../libs/MongoDBConnect')()
const Promise = require('promise');

// const Comment = require('../models/Comment')
const Posts = require('../models/Post')
const Likes = require('../models/Like')



// post_ID = parseInt(Math.random() * 499).toString()
// console.log("post id: " + post_ID)

/* model: 1.909ms
model2: 0.433ms
model3: 0.112ms */

/* model: 1.688ms
model2: 0.433ms
model3: 0.112ms 
1.707*/


/* -- get post title -- model*/
// const promise1 = new Promise((resolve, reject) => {
// 	console.time("model");
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
// 	.then(console.timeEnd("model"))
// 	.then(docs => {
// 		console.log(docs);
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})





/* -- get post title, num(like) -- model*/
post_ID = "5000"
const promise2 = new Promise((resolve, reject) => {
	Posts
		.find({ id: post_ID }, (err, docs) => {
			if (err) {
				console.error(err)
				return
			}
			resolve('done')
			// resolve(docs[0])
		})
})

const promise3 = new Promise((resolve, reject) => {
	Likes
		.where({ postID: post_ID }).countDocuments((err, val) => {
			if (err) {
				console.error(err)
				return
			}
			resolve(val)
		})
})

console.time("model2");
// var start = Date.now();
// var start = moment().format('x')
Promise.all([promise2, promise3])
// 	.then(docs => {
// 		// console.log(docs);
// 	})
	.then(console.timeEnd("model2"))
	.then(result => {
		// end = Date.now()
		// var end = moment().format('x')
		// console.log("time: " + (end - start))
		console.log(result)
	})
	.catch(err => {
		console.error(err)
	})




/* -- get post who like -- model*/

// const promise4 = new Promise((resolve, reject) => {
// 	Likes
// 		.find({ postID: post_ID }, 'createdBy', (err, docs) => {
// 			if (err) {
// 				console.error(err)
// 				return
// 			}
// 			resolve(docs)
// 		})
// })


// console.time("model3");
// promise4
// 	.then(console.timeEnd("model3"))
// 	.then(result => {
// 		console.log(result)
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})