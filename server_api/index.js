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

app.use(cookieParser({}))

app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl)
    // console.log('cookies:', req.cookies)
    next()
})

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(require('./routes'))

app.listen(process.env.api_port, () => {
    console.log(`Server listen on ${process.env.api_port}`)
})