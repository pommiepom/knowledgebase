const jwt = require('jsonwebtoken')

const authen = (role) => {
	return ((req, res, next) => {
	
		const token = req.headers['x-token'] || req.headers['x-access-token'] ||
			req.headers['authorization'] || req.cookies['jwt'] || req.signedCookies['jwt']

		if (token != null) {
			if (token.substring(0, 7) == "Bearer "){
				token = token.slice(7)
			}
			const decoded = jwt.verify(token, 'secret', {
				algorithm: 'HS512'
			})
			if (decoded.role == 'admin') {
				return next()
			}
			if (decoded.role == 'user' & role == 'user') {
				return next()
			}
			res.status(403).json('invalid')
		} else {
			res.status(403).json('null token')
		}
	})
}

exports.admin = authen('admin')
exports.user = authen('user')