const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('API Service')
})

router.use('/users', require('./User'))
router.use('/comments', require('./Comment'))
router.use('/posts', require('./Post'))
router.use('/reports', require('./Report'))
router.use('/likes', require('./Like'))
router.use('/files', require('./File'))
router.use('/login', require('./Login'))

router.get('/error/:code', (req, res) => {
    const err = new Error('error message')
    err.statusCode = req.params.code
    throw err
})

router.use((err, req, res, next) => {
    let statusCode = 500
    if (err.statusCode) {
        statusCode = err.statusCode
    }
    // if (req.is('application/json')) {
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/json')>=0) {
        // console.log(err);
        const {
            message,
            stack
        } = err
        res.status(statusCode).json({
            error: {
                message,
                stack
            }
        })
    } else {
        res.status(statusCode).send(err.message)
    }
})

module.exports = router