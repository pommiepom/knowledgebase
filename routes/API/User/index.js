const express = require('express')
const router = express.Router()
const moment = require('moment')

const User = require('../../../controllers/User')
const Post = require('../../../controllers/Post')
const authen = require('../../../middlewares/Authentication')

router.get('/', authen.admin, (req, res) => {
	const query = { deleted: 0 }

	User.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:_id', authen.user, (req, res) => {
	const query = req.params

	User.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.post('/', authen.admin, (req, res) => {
	const props = req.body

	User.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.patch('/:_id', authen.user, (req, res) => {
	const query = req.params
	const update = req.body
	
	User.update(query, update)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/:_id', authen.admin, (req, res) => {
	const query = req.params
	const update = { delDate: moment().format('YYYY-MM-DD HH:mm:ss'), deleted: 1}

	User.del(query, update)
		.then(doc => {
			console.log(doc)
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:createdBy/posts', authen.user, (req, res) => {
	const query = req.params
	query.deleted = 0 

	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router