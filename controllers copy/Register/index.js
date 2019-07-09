const Register = require('../../models copy/User')

exports.add = add = (props) => {
    const register = new Register({
        username: props.username,
        password: props.password,
        name: props.name,
        lastname: props.lastname,
        displayname: props.displayname,
        birthDate: props.birthDate,
        email: props.email
    })
    return register.save()
}

exports.list = list = () => {
    return Register.find().exec()
}