const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

const schema = Schema({
    // reportedBy: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User',
    //     require: true
    // },
    // postID: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Post',
    //     require: true
    // },
    reportedBy: {
        type: Number, 
        // ref: 'User',
        require: true
    },
    postID: {
        type: Number, 
        // ref: 'Post',
        require: true
    },
    issue: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now(),
        require: true
    },
    adminEmail: {
        type: String,
        default: "admin@klb.com",
        require: true
    }
})

module.exports = mongoose.model('Report', schema)