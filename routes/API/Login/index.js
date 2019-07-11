const express = require('express')
const router = express.Router()

const Login = require('../../../controllers/Login')

router.post('/', (req, res) => {
	const props = req.body
	const username = props.username
	const password = props.password

	Login.check(username)
		.then(passwordDB => {
			console.log("pass: " + password)
			console.log("passDB: " + passwordDB.password)	

			if (password == passwordDB.password){
				res.json('valid')
			} else {
				res.json('invalid')
			}			
		}).catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router