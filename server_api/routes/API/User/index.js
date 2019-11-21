const express = require('express')
const router = express.Router()
const moment = require('moment')
const bcrypt = require('bcryptjs');

const User = require('../../../controllers/User')
const Post = require('../../../controllers/Post')
const authen = require('../../../middlewares/Authentication')
const decode = require('../../../libs/Decode')

router.get('/', authen.admin, (req, res, next) => {
	const query = {
		deleted: 0
	}

	User.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/signedIn', authen.user, (req, res, next) => {
	const query = { _id: decode(req)._id }

	User.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id', authen.user, (req, res, next) => {
	const query = req.params

	User.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.admin, (req, res, next) => {
	const props = req.body
	const password = props.password

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			throw new Error(err)
		}

		props.password = hash

		User.add(props)
			.then(doc => {
				res.json(doc)
			})
			.catch(next)
	});
})

router.patch('/:_id', authen.user, (req, res, next) => {
	const query = req.params
	const update = req.body

	const hashPassword = new Promise((resolve, reject) => {
		if (update.hasOwnProperty("password")){
			const password = update.password
		
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					throw new Error(err)
				}
		
				update.password = hash
				resolve(update)
			});
		}
		else {
			resolve(update)
		}
	});

	hashPassword
		.then((update) => {
			User.update(query, update)
				.then(doc => {
					res.json(doc);
				})
				.catch(next)
		})
})

router.delete('/:_id', authen.admin, (req, res, next) => {
	const query = req.params
	const update = {
		delDate: moment().format('YYYY-MM-DD HH:mm:ss'),
		deleted: 1
	}

	User.del(query, update)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:createdBy/posts', authen.user, (req, res, next) => {
	const query = req.params
	query.deleted = 0

	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

module.exports = router