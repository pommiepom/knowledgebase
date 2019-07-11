const express = require('express')
const router = express.Router()

const Authen = require('../../../controllers/Authen')

/* invalid
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lZWUiLCJpYXQiOjE1NjI2NTQ0MDR9.GFkY9TxEaJj1-vMSYuERmk2N0Y9ALTGpf7vKCuZa8-gQdkE_SK-gRWz3BfBtc3x96BExAmx_srJkkDzxYhusLw

valid
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNTYyNjU0MzA0fQ.G-qxhN-J45xvoNtNWgmQasu9jF_ZRl-gMPvBxJPVmD18l0sNfMW_tXmU0n_pXKKf6ZEc6xvflHK3RVoovvzXog
*/

router.get('/', (req, res) => {
	var token = req.headers.authorization
	Authen.check(token)
		.then(doc => {
			console.log(doc);
			if (doc.length != 0) {
				res.json('valid')
			} else {
				res.json('invalid')
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router