const express = require('express')
const router = express.Router()

const Report = require('../../../controllers/Report')
const authen = require('../../../middlewares/Authentication.js')

router.get('/', authen.admin, (req, res) => {
	const query = null

	Report.list(query)
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

	Report.list(query)
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

	Report.add(props)
		.then(doc => {
			res.json(doc)
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router