const express = require('express')
const router = express.Router()

const Post = require('../../../controllers copy/Post')
const Comments = require('../../../models copy/Comment')
const Likes = require('../../../models copy/Like')

router.get('/', (req, res) => {
	const query = null	
	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:id', (req, res) => {
	const query = req.params
	Post.list(query)
		.then(doc => {
			console.log(doc);
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

router.put('/:id', (req, res) => {
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

router.delete('/del/:id', (req, res) => {
	const query = req.params
	console.log(query);
	const update = { delDate: Date.now(), deleted: 1}

	const delPost = Post.del(query, update)
	const delComment = Comments.del({ postID: query.id }, update)

	Promise.all([delPost, delComment])
		.then(doc => {
			console.log(doc)
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/comments/:id', (req, res) => {
	const query = { postID: req.params.id }
	console.log(query);
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

router.get('/likes/:id', (req, res) => {
	const query = { postID: req.params.id }
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

router.delete('/likes/:id', (req, res) => {
	const query = { postID: req.params.id }
	console.log(query);
	Likes.find(query)
		// .populate('postID')
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