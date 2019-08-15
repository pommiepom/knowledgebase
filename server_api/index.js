require('./libs/MongoDBConnect')()

const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser({}))

app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl)
    // console.log('cookies:', req.cookies)
    next()
})

app.use(require('./routes'))

app.listen(8001, () => {
    console.log('Server listen on 8001')
})