const express = require('express')
const router = express.Router()
const moment = require('moment');
const multer = require('multer')

const Post = require('../../../controllers/Post')
const Like = require('../../../controllers/Like')
const File = require('../../../controllers/File')
const User = require('../../../controllers/User')
const Comment = require('../../../controllers/Comment')
const authen = require('../../../middlewares/Authentication')
const getUsername = require('../../../libs/GetUsername')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'D:/2562_1/knowledgebase/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + moment().format('YYYYMMDDHHmmSS'))
	}
})

const upload = multer({
	storage: storage
})

router.get('/', (req, res) => {
	const query = {
		deleted: 0
	}

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

router.post('/', authen.user, (req, res) => {
	const props = req.body
	const username = getUsername(req)

	User.get_id(username)
		.then(doc => {
			props.createdBy = doc._id

			Post.add(props)
				.then(doc => {
					console.log(doc);
					res.json(doc)
				}).catch(err => {
					console.error(err)
					res.status(500).json(err)
				})
		})
		.catch(err => {
			console.log(err);
		})
})

router.get('/:_id/filenum', (req, res) => {
	const query = req.params

	return Post.list(query)
		.then(doc => {
			res.status(200).json({
				filenum: doc[0].fileID.length
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err)
		})
})

router.patch('/:_id', authen.user, (req, res) => {
	const query = req.params
	const lastUpdate = moment().format('YYYY-MM-DD HH:mm:ss')
	const update = {
		$set: req.body,
		lastUpdate: lastUpdate
	}

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
	const query2 = {
		postID: query._id
	}
	const update = {
		delDate: moment().format('YYYY-MM-DD HH:mm:ss'),
		deleted: 1
	}

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
				if (doc.length == 0) throw "is Empty"
				res.json(doc[0].fileID)
			} catch (err) {
				console.error(err)
				res.status(500).json(err)
			}
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.patch('/:_id/file', authen.user, upload.single('file'), (req, res) => {
	const query = req.params
	const time = moment().format('YYYY-MM-DD HH:mm:ss')

	File.add(req.file, time)
		.then(file => {
			const update = {
				$push: {
					fileID: file[0]._id
				},
				$set: {
					lastUpdate: time
				}
			}
			return Post.update(query, update)
		})
		.then(doc => {
			console.log(doc);
			res.json(doc)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.delete('/:_id/file', authen.user, (req, res) => {
	const post_id = req.params
	const fileID = req.body.fileID

	File.delandUpdate(fileID, post_id)
		.then(doc => {
			console.log(doc);
			res.json(doc);
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

module.exports = router