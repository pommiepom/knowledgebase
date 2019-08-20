const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

			// console.log("username: ", username);
			// console.log(doc);

			bcrypt.compare(password, doc.password)
				.then(result => {
					if (!result) {
						let err = new Error("password don't match");
						err.statusCode = 400;
						throw err
					}
					const token = jwt.sign({
						username: username,
						role: doc.role
					}, secret, {
						algorithm: 'HS512'
					})

					res.cookie('jwt', token, {
						maxAge: 1000 * 60 * 30
					})
					res.status(200).end('token: ' + token)
				})
				.catch(next)
		})
		.catch(next)
})

module.exports = router