require('../libs/MongoDBConnect')()

const Controller = require('../controllers/User')

for (i=0; i<500; i++) {
    Controller.add({
        username: "username",
        password: "password",
        name: "name",
        lastname: "lastname",
        displayname: "displayname",
        birthDate: "1997-07-31",
        email: "email",
        aboutme: "aboutme",
        level: "admin",
        id: i
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
        
}