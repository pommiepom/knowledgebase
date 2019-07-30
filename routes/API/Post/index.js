const express = require('express')
const router = express.Router()
const moment = require('moment');
const multer = require('multer')

const Post = require('../../../controllers/Post')
const Like = require('../../../controllers/Like')
const File = require('../../../controllers/File')
const Comment = require('../../../controllers/Comment')
const authen = require('../../../middlewares/Authentication')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'D:/2562_1/knowledgebase/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + time)
	}
})

const time = moment().format('YYYYMMDDHHmmSS')
const upload = multer({ storage: storage })


router.get('/', (req, res) => {
	const query = { deleted: 0 }	

	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:_id', (req, res) => {
	const query = req.params

	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

// router.post('/', authen, (req, res) => {
// 	const props = req.body
// 	Post.add(props)
// 		.then(doc => {
// 			res.json(doc)
// 		}).catch(err => {
// 			console.error(err)
// 			res.status(500).json(err)
// 		})
// })

router.post('/', authen.user, upload.array('file'), (req, res) => {
	if (req.files.length < 6 ) {
		File.add(req.files, time)
			.then(doc => {
				const fileID = []
				for (let i = 0; i < doc.length; i++) {
					fileID[i] = doc[i]._id
				}
				req.body['fileID'] = fileID

				return Post.add(req.body)
			})
			.then(doc => {
				console.log(doc);
				res.json(doc)
			})
			.catch(err => {
				console.error(err)
				res.status(500).json(err)
			})
	}
	else {
		console.log("can't upload over 5 files");
		res.status(400).json("can't upload over 5 files")		
	}
})

router.patch('/:_id', authen.user, (req, res) => {
	const query = req.params
	const lastUpdate =  moment().format('YYYY-MM-DD HH:mm:ss')
	const update = { $set: req.body, lastUpdate: lastUpdate }
	
	Post.update(query, update)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/:_id', authen.user, (req, res) => {
	const query = req.params
	const query2 = { postID: query._id }
	const update = { delDate: moment().format('YYYY-MM-DD HH:mm:ss'), deleted: 1}

	const delPost = Post.del(query, update)
	const delComment = Comment.del(query2, update)

	Promise.all([delPost, delComment])
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:postID/comments', (req, res) => {
	const query = req.params
	query.deleted = 0

	Comment.list(query)
		// .populate('postID')
		// .populate('createdBy')
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:postID/likes', (req, res) => {
	const query = req.params

	Like.list(query)
		// .populate('commentID')
		// .populate('likedBy')
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.get('/:_id/files', (req, res) => {
	const query = req.params

	Post.list(query)
		.then(doc => {
			try {
				res.json(doc[0].fileID)
			}
			catch (err) {
				console.error(err)
				res.status(500).json(err)
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.post('/:_id/files/add', authen.user, upload.array('file'), (req, res) => {
	const query = req.params
	const lastUpdate = moment().format('YYYY-MM-DD HH:mm:ss')

	Post.list(req.params)
		.then(doc => { 
			if (doc[0].fileID.length + req.files.length > 5) {
				res.status(400).end("can't upload over 5 files")
			}
			else {
				File.add(req.files, time)
					.then(doc => {
						const fileID = []
						for (let i = 0; i < doc.length; i++) {
							fileID[i] = doc[i]._id
						}
						const update = { $push: { fileID: fileID }, $set: { lastUpdate: lastUpdate } }

						return Post.update(query, update)
					})
					.then(doc => {
						res.json(doc)
					})
					.catch(err => {
						console.error(err)
						res.status(500).json(err)
					})
			}
		})
})

router.post('/:_id/files/del', authen.user, (req, res) => {
	const post_id = req.params
	const fileID = req.body.file

	File.delandUpdate(fileID, post_id)
		.then(doc => {
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
	console.log("del");
})

module.exports = router