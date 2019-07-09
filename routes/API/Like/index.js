const express = require('express')
const router = express.Router()

const Like = require('../../../controllers/Like')

router.get('/', (req, res) => {
	const query = null	
	Like.list(query)
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
	console.log(query);
	Like.list(query)
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
	Like.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/:id', (req, res) => {
	const query = req.params
	Like.del(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router