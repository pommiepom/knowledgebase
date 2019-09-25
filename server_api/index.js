require('dotenv').config()
require('./libs/MongoDBConnect')()

const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser({
    name: 'session',
    domain: ['localhost'],
    secret: 'secr#redd13',
    httpOnly: true,
    maxAge: 60*60*24
}))

app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl)
    console.log('cookies:', req.cookies)
    next()
})

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/test/set', (req, res) => {
    console.log('test set')
    res.cookie('value', 100)
    res.send('ok')
})
app.get('/test/get', (req, res) => {
    console.log('test get', req.cookies)
    res.send('ok')
})

app.use(require('./routes'))

app.listen(process.env.api_port, () => {
    console.log(`Server listen on ${process.env.api_port}`)
})