const Report = require('../../models/Report')

exports.add = add = (props) => {
    const report = new Report({
        reportedBy: props.reportedBy,
        postID: props.postID,
        issue: props.postID,
        description: props.description
    })
    return report.save()
}

exports.list = list = () => {
    return Report.find()
    // .populate('reportedBy')
    // .populate('postID')
    .exec()
}