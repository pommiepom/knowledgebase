const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const postSchema = Schema({
    createdBy: {
        type: String, 
        // ref: 'User.id',
        require: true
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User',
    //     require: true
    // },
    createdTime: {
        type: Date,
        default: Date.now(),
        require: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now(),
        require: true
    },
    title: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    category: {
        type: String
    },
    deleted: {
        type: Number,
        default: 0,
        require: true
    },
    delDate: {
        type: Date
    },
    id: {
        type: String
    }
    // attachment : [{
    //     data: Buffer, 
    //     contentType: String
    // }]
})

module.exports = mongoose.model('Post', postSchema)