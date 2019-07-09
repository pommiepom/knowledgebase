const Login = require('../../models/User')

exports.add = add = (props) => {
    const login = new Login({
        username: props.username,
        password: props.password,
        remember: props.remember
    })
    return login.save()
}

exports.list = list = () => {
    return Login.find().exec()
}