require('../libs/MongoDBConnect')()

// const userController = require('../controllers/User')
const postController = require('../controllers/Post')
// const commentController = require('../controllers/Comment')

for (i = 0; i < 1000; i++) {
    postController.add({
        createdBy: parseInt(Math.random() * 499),
        title: "Title",
        detail: "detail",
        category: "Category",
        id: i
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
}