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

module.exports = router

