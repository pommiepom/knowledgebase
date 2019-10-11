const Categoryies = require('../../models/Category')

exports.add = add = (props) => {
    const category = new Categoryies({
        name: props.name,
    })
    return category.save()
}

exports.list = list = () => {
    return Categoryies.find().sort({ name: 'asc' }).exec()
}

exports.update = update = (query, update) => {
	return Categoryies.findOneAndUpdate(query, update, { new: true })
}

exports.del = del = (query) => {
    return Categoryies.deleteMany(query)    
}