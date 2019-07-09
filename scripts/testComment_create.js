require('../libs/MongoDBConnect')()

const commentController = require('../controllers/Comment')

for (i = 0; i < 1000; i++) {
    commentController.add({
        postID: parseInt(Math.random() * 499),
		createdBy: parseInt(Math.random() * 499),
        message: "message",
        id: i
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
}