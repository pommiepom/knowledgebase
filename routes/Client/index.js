const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello world')
})
router.use('/posts', require('./Post'))
router.use('/login', require('./Login'))

module.exports = router