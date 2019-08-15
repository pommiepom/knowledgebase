const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const File = require('../../../controllers/File')
const authen = require('../../../middlewares/Authentication.js')

mongoose.set('useCreateIndex', true);

router.get('/', authen.admin, (req, res, next) => {
	const query = null

	File.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id', (req, res, next) => {
	const query = req.params

	File.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

module.exports = router