const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const Login = require('../../../controllers/Login')

router.post('/', (req, res) => {
	const props = req.body
	const username = props.username
	const password = props.password

	Login.check(username)
		.then(doc => {
			if (doc != null) {
				console.log(doc);
				console.log("pass: " + password)
				console.log("passDB: " + doc.password)	
				if (password == doc.password){					
					try {
						let token = jwt.sign({ username: username, role: doc.role }, 'secret', { algorithm: 'HS512'})
						res.cookie('jwt', token, { maxAge: 1000*60*30  *1000 })
						res.status(200).end('token: ' + token)
					}
					catch(err) {
						console.log(err);
						res.status(500).json(err)
					}
				} else {
					res.json('invalid')
				}			
			}
			else {
				res.json('not found this username')
			}
			
		}).catch(err => {
			res.status(500).json(err)
		})
})

module.exports = router