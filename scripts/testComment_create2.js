require('../libs/MongoDBConnect')()

const commentController = require('../controllers/Comment copy')

for (i = 0; i < 1000; i++) {
    commentController.add({
        postID: parseInt(Math.random() * 499),
		createdBy: parseInt(Math.random() * 499),
        message: "message",
        id: i,
        likedBy: [parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString()]
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
}