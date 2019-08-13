const express = require('express')
const router = express.Router()
const moment = require('moment')

const Comment = require('../../../controllers/Comment')
const Like = require('../../../controllers/Like')
const authen = require('../../../middlewares/Authentication.js')

router.get('/', authen.admin, (req, res) => {
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

router.get('/:_id', authen.admin, (req, res) => {
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

router.post('/', authen.user, (req, res) => {
	const props = req.body

	Comment.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:commentID/likes', (req, res) => {
	const query = req.params

	Like.list(query)
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

router.delete('/:_id', authen.user, (req, res) => {
	const query = req.params
	const update = { deleted: 1, delDate: moment().format('YYYY-MM-DD HH:mm:ss')}

	Comment.del(query, update)
		.then(doc => {		
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router