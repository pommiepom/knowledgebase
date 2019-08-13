const Users = require('../../models/User')
const moment = require('moment')

exports.add = add = (props) => {
    const user = new Users({
        username: props.username,
        password: props.password,
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        role: props.role
    })
    return user.save()
}

exports.list = list = (query) => {
    return Users.find(query).exec()
}

exports.update = update = (query, update) => {
    return Users.findOneAndUpdate(query, { $set: update, lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')}, { new: true })
}

exports.del = del = (query, update) => {
    return Users.findOneAndUpdate(query, { $set: update }, { new: true })    
}

exports.get_id = get_id = (username) => {
    const query = { username: username }
    return Users.findOne(query, '_id').exec()
}