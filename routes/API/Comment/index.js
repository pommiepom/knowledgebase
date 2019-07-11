const express = require('express')
const router = express.Router()

const Comment = require('../../../controllers/Comment')
const Like = require('../../../controllers/Like')
const Likes = require('../../../models/Like')

const moment = require('moment')

router.get('/', (req, res) => {
	const query = { deleted: 0 }
	Comment.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:_id', (req, res) => {
	const query = req.params
	Comment.list(query)
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
	Comment.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/likes/:_id', (req, res) => {
	const query = { commentID: req.params._id }
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

router.delete('/del/:_id', (req, res) => {
	const query = req.params
	const update = { deleted: 1, delDate: moment().format('YYYY-MM-DD HH:mm:ss')}

	const delComment = Comment.del(query, update)
	const delLike = Like.del({ commentID: query._id })

	Promise.all([delComment, delLike])
		.then(doc => {		
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router