require('../libs/MongoDBConnect')()

// const userController = require('../controllers/User')
const Like = require('../controllers/Like')
// const commentController = require('../controllers/Comment')

for (i = 50000; i < 100000; i++) {
    Like.add({
        postID:  '5000',
        // commentID: parseInt((i - 4000) / 4),
        likedBy: parseInt(Math.random() * 499),
        id: '5000'
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
}