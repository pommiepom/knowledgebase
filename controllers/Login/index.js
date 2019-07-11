const Login = require('../../models/User')

exports.check = check = (username) => {
    return Login.findOne({ username: username}, 'password').exec()
}