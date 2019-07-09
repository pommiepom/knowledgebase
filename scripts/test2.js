require('../libs/MongoDBConnect')()

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const Comment = require('../models/Comment')
