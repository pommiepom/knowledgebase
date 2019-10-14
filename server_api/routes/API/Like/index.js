const express = require('express')
const router = express.Router()

const Like = require('../../../controllers/Like')
const authen = require('../../../middlewares/Authentication.js')
const decode = require('../../../libs/Decode')

router.get('/', authen.admin, (req, res, next) => {
	const query = null

	Like.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/count', (req, res, next) => {
	const query = req.query
	
	Like.count(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id', authen.admin, (req, res, next) => {
	const query = req.params

	Like.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.user, (req, res, next) => {
	const props = req.body
	const userID = decode(req)._id

	Like.add(props, userID)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

router.delete('/commentID=:commentID', authen.user, (req, res, next) => {
	const query = req.params
	query.likedBy = decode(req)._id

	Like.del(query)
		.then(doc => {
			console.log(doc);
			res.json(doc);
		})
		.catch(next)
})

router.delete('/postID=:postID', authen.user, (req, res, next) => {
	const query = req.params
	query.likedBy = decode(req)._id

	Like.del(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.delete('/:_id', authen.user, (req, res, next) => {
	const query = req.params

	Like.del(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

module.exports = router