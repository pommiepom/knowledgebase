const express = require('express');
const router = express.Router();

const path = require('path')

router.use('/api', require('./API'))

router.use('/', require('./Client'))

router.use('/public', express.static(path.join(__dirname, '../', 'static')))
router.use('/axios', express.static(path.join(__dirname, '../', 'node_modules/axios/dist')))
router.use('/jquery', express.static(path.join(__dirname, '../', 'node_modules/jquery/dist')))
router.use('/library', express.static(path.join(__dirname, '../libs')))

module.exports = router