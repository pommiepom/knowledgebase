require('../libs/MongoDBConnect')()

// const userController = require('../controllers/User')
const postController = require('../controllers/Post copy')
// const commentController = require('../controllers/Comment')
function loop_like() {
    var arr = []
    for (i = 0; i < 100000; i++) {
        arr[i] = parseInt(Math.random() * 499).toString()
    }
    
    return arr
}

// for (i = 0; i < 1000; i++) {
//     postController.add({
//         createdBy: parseInt(Math.random() * 499),
//         title: "Title",
//         detail: "detail",
//         category: "Category",
//         id: i,
//         likedBy: [parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString(), parseInt(Math.random() * 499).toString()]
//         })
//         .then(doc => {
//             console.log(doc);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

// for (i = 0; i < 1000; i++) {
    postController.add({
        createdBy: parseInt(Math.random() * 499),
        title: "Title",
        detail: "detail",
        category: "Category",
        id: '5000',
        likedBy: loop_like()
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        })
// }