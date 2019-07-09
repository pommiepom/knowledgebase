const express = require('express');
const router = express.Router();

router.use('/api', require('./API'))
router.use('/', require('./Client'))

module.exports = router