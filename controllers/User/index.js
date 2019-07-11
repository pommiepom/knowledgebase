const User = require('../../models/User')
var moment = require('moment')

exports.add = add = (props) => {
    const user = new User({
        username: props.username,
        password: props.password,
        name: props.name,
        lastname: props.lastname,
        displayname: props.name + " " + props.lastname,
        email: props.email,
        level: props.level
        // id: props.id
    })
    return user.save()
}

exports.list = list = (query) => {
    return User.find(query).exec()
}

exports.update = update = (query, update) => {
    return User.findOneAndUpdate(query, { $set: update, lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss') })
}

exports.del = del = (query, update) => {
    return User.findOneAndUpdate(query, { $set: update }, { new: true })    
}