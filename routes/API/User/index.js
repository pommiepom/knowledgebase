const express = require('express')
const router = express.Router()

var moment = require('moment')
const User = require('../../../controllers/User')

router.get('/', (req, res) => {
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

router.get('/:_id', (req, res) => {
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

router.post('/registers', (req, res) => {
	const props = req.body
	User.add(props)
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
	User.update(query, update)
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
	console.log(query);
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

module.exports = router