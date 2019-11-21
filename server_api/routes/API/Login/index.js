const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const Login = require('../../../controllers/Login')

router.post('/', (req, res, next) => {
	const props = req.body
	const username = props.username
	const password = props.password

	Login.check(username)
		.then(doc => {
			if (doc == null) {
				let err = new Error("not found username");
				err.statusCode = 400;
				throw err
			}

			bcrypt.compare(password, doc.password)
				.then(result => {
					if (!result) {
						let err = new Error("password don't match");
						err.statusCode = 400;
						throw err
					}

					const token = jwt.sign({
						username: username,
						role: doc.role,
						_id: doc._id
					}, process.env.secret, {
						algorithm: 'HS512'
					})

					res.cookie('jwt', token)
					res.status(200).json({
						token
					})
				})
				.catch(next)
		})
		.catch(next)
})

module.exports = router