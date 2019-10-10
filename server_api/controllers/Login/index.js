const Logins = require('../../models/User')

exports.check = check = (username) => {
	return Logins.findOne({ username }, 'password role').exec()
}