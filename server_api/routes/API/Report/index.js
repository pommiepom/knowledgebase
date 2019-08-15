const express = require('express')
const router = express.Router()

const Report = require('../../../controllers/Report')
const authen = require('../../../middlewares/Authentication.js')

router.get('/', authen.admin, (req, res, next) => {
	const query = null

	Report.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id', authen.admin, (req, res, next) => {
	const query = req.params

	Report.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.user, (req, res, next) => {
	const props = req.body

	Report.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

module.exports = router