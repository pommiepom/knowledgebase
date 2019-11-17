const jwt = require('jsonwebtoken')
require('dotenv').config()

const authen = (role) => {
	return ((req, res, next) => {
		const token = req.headers['x-token'] || req.headers['x-access-token'] ||
		req.headers['authorization'] || req.headers['jwt'] || req.cookies['jwt'] || req.signedCookies['jwt']

		if (token == null) {
			let err = new Error("null token");
			err.statusCode = 401;
			throw err
		}

		if (token.substring(0, 7) == "Bearer ") {
			token = token.slice(7)
		}
		
		const decoded = jwt.verify(token, process.env.secret, {
			algorithm: 'HS512'
		})

		if (decoded.role == 'admin') {
			return next()
		}
		if (decoded.role == 'user' & role == 'user') {
			return next()
		}

		let err = new Error("invalid");
		err.statusCode = 401;
		throw err
	})
}

exports.admin = authen('admin')
exports.user = authen('user')