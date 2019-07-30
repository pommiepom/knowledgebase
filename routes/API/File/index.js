const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const File = require('../../../controllers/File')
const authen = require('../../../middlewares/Authentication.js')

mongoose.set('useCreateIndex', true);

router.get('/', authen.admin, (req, res) => {
	const query = null	

	File.list(query)
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
	
	File.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
	 		console.error(err)
			res.status(500).json(err)
		})
})

// router.delete('/:_id', authen.user, (req, res) => {
// 	const query = req.params
// 	File.delandUpdate(query)
// 		.then(doc => {
// 			res.json(doc);
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).json(err)
// 		})
// })

module.exports = router