const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useFindAndModify', false);

const fileSchema = Schema({
    name: {
		type: String, 
        require: true
    },
    date: {
        type: Date,
        default: null,
        require: true
    },
    expired_at: {
        type: Date,
        default: null
    },
    path: {
        type: String,
        default: null
    }
})

fileSchema.index({ "expired_at": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('File', fileSchema)