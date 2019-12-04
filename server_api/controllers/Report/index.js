const Reports = require('../../models/Report')
const moment = require('moment')

exports.add = add = (props) => {
	const report = new Reports({
		reportedBy: props.reportedBy,
		postID: props.postID,
		description: props.description,
		date: moment().format('YYYY-MM-DD HH:mm:ss')
	})
	return report.save()
}

exports.count = count = () => {
	return Reports.aggregate(
		[{
			$addFields: {
				'post_id': {
					'$toObjectId': '$postID'
				}
			}
		}, {
			$lookup: {
				from: 'posts',
				localField: 'post_id',
				foreignField: '_id',
				'as': 'post'
			}
		}, {
			$unwind: {
				'path': '$post'
			}
		}, {
			$project: {
				'postID': 1,
				'post.deleted': 1,
			}
		}, {
			$match: {
				'post.deleted': 0
			}
		}, {
			$count: 'reportedNum'
		}])
}

exports.list = list = (skip, limit) => {
	return Reports.aggregate(
		[{
			$addFields: {
				'post_id': {
					'$toObjectId': '$postID'
				},
				'reportedBy_id': {
					'$toObjectId': '$reportedBy'
				}
			}
		}, {
			$lookup: {
				from: 'posts',
				localField: 'post_id',
				foreignField: '_id',
				'as': 'post'
			}
		}, {
			$lookup: {
				from: 'users',
				localField: 'reportedBy_id',
				foreignField: '_id',
				'as': 'reportedBy'
			}
		}, {
			$unwind: {
				'path': '$post'
			}
		}, {
			$unwind: {
				'path': '$reportedBy'
			}
		}, {
			$project: {
				'description': 1,
				'postID': 1,
				'post.title': 1,
				'post.deleted': 1,
				'reportedBy.username': 1
			}
		}, {
			$match: {
				'post.deleted': 0
			}
		}, {
			$limit: limit + skip
		}, {
			$skip: skip
		}])
}

exports.listOne = listOne = (query) => {
	return Reports.find(query)
		.exec()
}