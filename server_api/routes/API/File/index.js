const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
const mime = require('mime-types')

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

router.get('/show/:_id', (req, res, next) => {
	const query = req.params
	File.list(query)
		.then(doc => {
			const path = doc[0].path
			const name = doc[0].name
			const fileName = doc[0].name.slice(0, -15)

			fs.readFile((path + name), (err, data) => {
				const type = mime.lookup((path + fileName))
			
				if (err) throw err;
				res.writeHead(200, {'Content-Type': type});
				res.end(data);
			});
		})
		.catch(next)
})

module.exports = router