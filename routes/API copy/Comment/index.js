const express = require('express')
const router = express.Router()

const Comment = require('../../../controllers copy/Comment')
const Likes = require('../../../models copy/Like')

router.get('/', (req, res) => {
	const query = null
	Comment.list(query)
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

router.get('/likes/:id', (req, res) => {
	const query = { commentID: req.params.id }
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

router.put('/del/:id', (req, res) => {
	const query = req.params
	const update = { delDate: Date.now(), deleted: 1}

	Comment.del(query, update)
		.then(doc => {
			console.log(doc);
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

// router.delete('/:_id', (req, res) => {
// 	var query = req.params
// 	Comment.del(query)
// 		.then(doc => {		
// 			res.json(doc);
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).json(err)
// 		})
// 	query = { commentID: query._id }
// 	Like.del(query)
// 	.then(doc => {
// 			res.json(doc);
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).json(err)
// 		})
// })

module.exports = router