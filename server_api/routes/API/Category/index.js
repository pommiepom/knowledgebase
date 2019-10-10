const express = require('express')
const router = express.Router()

const authen = require('../../../middlewares/Authentication.js')
const Category = require('../../../controllers/Category')

router.get('/', (req, res, next) => {
	Category.list()
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.admin, (req, res, next) => {
	const props = req.body

	Category.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

router.patch('/:_id', authen.admin, (req, res, next) => {
	const update = req.body
	const query = req.params

	Category.update(query, update)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

router.delete('/:_id', authen.admin, (req, res, next) => {
	const query = req.params

	Category.del(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

module.exports = router