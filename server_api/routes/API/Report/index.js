const express = require('express')
const router = express.Router()

const Report = require('../../../controllers/Report')
const authen = require('../../../middlewares/Authentication.js')
const decode = require('../../../libs/Decode')

router.get('/', authen.admin, (req, res, next) => {
	const query = req.query
	const limit = query.limit ? query.limit : Number.MAX_SAFE_INTEGER
	const skip = query.skip ? query.skip : 0

	Report.list(Number(skip), Number(limit))
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/count', authen.admin, (req, res, next) => {
	Report.count()
		.then(doc => {;
			res.json(doc[0]);
		})
		.catch(next)
})

router.get('/:_id', authen.admin, (req, res, next) => {
	const query = req.params

	Report.listOne(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/:postID', authen.user, (req, res, next) => {
	const props = req.body
	props.reportedBy = decode(req)._id
	props.postID = req.params.postID

	Report.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

module.exports = router