const Reports = require('../../models/Report')
const moment = require('moment')

exports.add = add = (props) => {
    const report = new Reports({
        reportedBy: props.reportedBy,
        postID: props.postID,
        commentID: props.commentID,
        issue: props.postID,
        description: props.description,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    return report.save()
}

exports.list = list = (query) => {
    return Reports.find(query)
    // .populate('reportedBy')
    // .populate('postID')
    .exec()
}