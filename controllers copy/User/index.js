const User = require('../../models copy/User')

exports.add = add = (props) => {
    const user = new User({
        username: props.username,
        password: props.password,
        name: props.name,
        lastname: props.lastname,
        displayname: props.displayname,
        birthDate: props.birthDate,
        email: props.email,
        // profilePic: props,
        aboutme: props.aboutme,
        level: props.level,
        remember: props.remember,
        id: props.id
    })
    return user.save()
}

exports.list = list = () => {
    return User.find().exec()
}

exports.update = update = (query, update) => {
    return User.findOneAndUpdate(query, { $set: update, lastUpdate: Date.now() })
}