const express = require('express')
const router = express.Router()

const Post = require('../../../controllers/Post')
const Like = require('../../../controllers/Like')
const Comment = require('../../../controllers/Comment')
const Comments = require('../../../models/Comment')
const Likes = require('../../../models/Like')

var moment = require('moment');

router.get('/', (req, res) => {
	const query = { deleted: 0 }	
	Post.list(query)
		.then(doc => {
			// var time = []
			// for(i = 0; i<doc.length; i++) {
			// 	time.push({_id: doc[i]._id, createdTime: moment(doc[i].createdTime).format('YYYY-MM-DD HH:mm:ss')})
			// }
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:_id', (req, res) => {
	const query = req.params
	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.post('/', (req, res) => {
	const props = req.body
	Post.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.put('/:_id', (req, res) => {
	const query = req.params
	const update = req.body
	Post.update(query, update)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/del/:_id', (req, res) => {
	const query = req.params //post _id
	const query2 = { postID: query._id } //postID
	const update = { delDate: moment().format('YYYY-MM-DD HH:mm:ss'), deleted: 1}

	const delPost = Post.del(query, update)
	const delLike = Like.del(query2)
	const delComment = Comment.delAll(query2, update)

	Promise.all([delPost, delLike, delComment])
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/comments/:_id', (req, res) => {
	const query = { postID: req.params._id, deleted: 0 }
	Comments.find(query)
		// .populate('postID')
		// .populate('createdBy')
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/likes/:_id', (req, res) => {
	const query = { postID: req.params._id }
	Likes.find(query)
		// .populate('commentID')
		// .populate('likedBy')
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router