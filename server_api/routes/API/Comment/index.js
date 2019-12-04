const express = require('express')
const router = express.Router()
const moment = require('moment')

const Comment = require('../../../controllers/Comment')
const Like = require('../../../controllers/Like')
const authen = require('../../../middlewares/Authentication.js')
const decode = require('../../../libs/Decode')

router.get('/', authen.admin, (req, res, next) => {
	const query = { deleted: 0 }

	Comment.list(query, null, null)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id', authen.admin, (req, res, next) => {
	const query = req.params

	Comment.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.user, (req, res, next) => {
	const props = req.body
	props.createdBy = decode(req)._id

	Comment.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

router.get('/:commentID/likes', authen.admin, (req, res, next) => {
	const query = req.params
	query.deleted = 0

	Like.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:commentID/likes/count', (req, res, next) => {
	const query = req.params
	
	Like.count(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.delete('/:_id', authen.admin, (req, res, next) => {
	const query = req.params
	const update = { deleted: 1, delDate: moment().format('YYYY-MM-DD HH:mm:ss')}

	Comment.del(query, update)
		.then(doc => {		
			res.json(doc);
		})
		.catch(next)
})

router.get('/:commentID/checkuser', (req, res, next) => {
	const likedBy = decode(req)
	const commentID = req.params.commentID

	Like.checkLike({ commentID, likedBy })
		.then(doc => {
			res.json(doc.length > 0)
		})
		.catch(next)
})

module.exports = router