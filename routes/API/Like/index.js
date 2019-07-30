const express = require('express')
const router = express.Router()

const Like = require('../../../controllers/Like')
const authen = require('../../../middlewares/Authentication.js')

router.get('/', authen.admin, (req, res) => {
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

router.get('/:_id', authen.admin, (req, res) => {
	const query = req.params

	Like.list(query)
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

	Like.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/:_id', authen.user, (req, res) => {
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