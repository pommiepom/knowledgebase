require('../libs/MongoDBConnect')()

const Controller = require('../controllers/User')

Controller.list()
    .then(doc => {
        console.log(doc);
    })
    .catch(err => {
        console.log(err);
    })