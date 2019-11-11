const express = require('express')
const router = express.Router()
const moment = require('moment');
const multer = require('multer')
require('dotenv').config()

const Post = require('../../../controllers/Post')
const Like = require('../../../controllers/Like')
const File = require('../../../controllers/File')
const User = require('../../../controllers/User')
const Comment = require('../../../controllers/Comment')
const authen = require('../../../middlewares/Authentication')
const decode = require('../../../libs/Decode')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, process.env.uploadFolder)
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + moment().format('YYYYMMDDHHmmSS'))
	}
})

const upload = multer({
	storage: storage
})

const getCreatedBy = (queryUser) => {
	if (queryUser) {
		const username = {
			username: {
				$regex: new RegExp(queryUser),
				$options: 'i'
			}
		}
		return User.list(username)
			.then(doc => {
				if (doc.length > 0) {
					return doc[0]._id
				} else {
					return null
				}
			})
	}
};

router.get('/', (req, res, next) => {
	const query = req.query
	const date = {}

	Promise.all([getCreatedBy(query.fromUser)])
		.then((vals) => {
			if (vals[0]) {
				query.createdBy = vals[0]
				delete query.fromUser
			} else if (!vals[0] & query.fromUser) {
				return next()
			}

			if (query.title) {
				query.title = {
					$regex: new RegExp(query.title),
					$options: 'i'
				}
			}

			if (query.fromDate) {
				date.$gte = new Date(query.fromDate)
				delete query.fromDate
			}

			if (query.toDate) {
				const toDate = new Date(query.toDate)
				date.$lt = toDate.setDate(toDate.getDate() + 1)
				delete query.toDate
			}

			const {
				limit,
				skip
			} = query || null

			if (date.length > 0) {
				query.date = date
			}

			query.deleted = 0

			delete query.limit
			delete query.skip

			Post.list(query, Number(skip), Number(limit))
				.then(doc => {
					res.json(doc);
				})
				.catch(next)
		});
})

router.get('/count', (req, res, next) => {
	const query = req.query
	const date = {}

	Promise.all([getCreatedBy(query.fromUser)])
		.then((vals) => {
			if (vals[0]) {
				query.createdBy = vals[0]
				delete query.fromUser
			} else if (!vals[0] & query.fromUser)  {
				return next()
			}

			if (query.title) {
				query.title = {
					$regex: new RegExp(query.title),
					$options: 'i'
				}
			}

			if (query.fromDate) {
				date.$gte = new Date(query.fromDate)
				delete query.fromDate
			}

			if (query.toDate) {
				const toDate = new Date(query.toDate)
				date.$lt = toDate.setDate(toDate.getDate() + 1)
				delete query.toDate
			}

			if (date.length > 0) {
				query.date = date
			}

			query.deleted = 0

			delete query.limit
			delete query.skip

	Post.count(query)
		.then(num => {
			console.log(num);
			res.json(num);
		})
		.catch(next)
	})
})

router.get('/:_id', (req, res, next) => {
	const query = req.params

	Post.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.post('/', authen.user, (req, res, next) => {
	const props = req.body
	props.createdBy = decode(req)._id

	Post.add(props)
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

router.get('/:_id/filenum', (req, res, next) => {
	const query = req.params

	return Post.list(query)
		.then(doc => {
			res.status(200).json({
				filenum: doc[0].fileID.length
			})
		})
		.catch(next)
})

router.patch('/:_id', authen.user, (req, res, next) => {
	const query = req.params
	const lastUpdate = moment().format('YYYY-MM-DD HH:mm:ss')
	const update = {
		$set: req.body,
		lastUpdate: lastUpdate
	}

	Post.update(query, update)
		.then(doc => {
			console.log(doc);
			res.json(doc);
		})
		.catch(next)
})

router.delete('/:_id', authen.user, (req, res, next) => {
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
		.catch(next)
})

router.get('/:postID/comments', (req, res, next) => {
	const query = req.params
	query.deleted = 0
	const {
		limit,
		skip
	} = req.query || null

	Comment.list(query, Number(skip), Number(limit))
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:postID/comments/count', (req, res, next) => {
	const query = req.params
	query.deleted = 0

	Comment.count(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:postID/likes/count', (req, res, next) => {
	const query = req.params
	Like.count(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:postID/likes', (req, res, next) => {
	const query = req.params

	Like.list(query)
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:_id/files', (req, res, next) => {
	const query = req.params

	Post.list(query)
		.then(doc => {
			res.json(doc[0].fileID)
		})
		.catch(next)
})

router.patch('/:_id/file', authen.user, upload.single('file'), (req, res, next) => {
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
			res.json(doc)
		})
		.catch(next)
})

router.delete('/:_id/file/:fileID', authen.user, (req, res, next) => {
	const postID = req.params._id
	const fileID = req.params.fileID

	const fileDel = File.delandUpdate(fileID, postID)
	const postUpdate = Post.update({
		_id: postID
	}, {
		$pull: {
			fileID: fileID
		},
		new: true
	})

	Promise.all([fileDel, postUpdate])
		.then(doc => {
			res.json(doc);
		})
		.catch(next)
})

router.get('/:postID/checkuser', (req, res, next) => {
	const likedBy = decode(req)._id
	const postID = req.params.postID

	Like.checkLike({
			postID,
			likedBy
		})
		.then(doc => {
			res.json(doc)
		})
		.catch(next)
})

module.exports = router