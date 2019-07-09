const express = require('express')
const router = express.Router()

const Login = require('../../../controllers/Login')

router.get('/', (req, res) => {
	Login.list()
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
	Login.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router