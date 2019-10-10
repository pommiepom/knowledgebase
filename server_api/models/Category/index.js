const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false);

const categorySchema = Schema({
    name: {
		type: String, 
      require: true
    }
})

module.exports = mongoose.model('Category', categorySchema)