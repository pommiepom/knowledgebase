const express = require('express');
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./libs/MongoDBConnect')()

app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl)
    next()
})

app.use(require('./routes'))

app.listen(8001, () => {
    console.log('Server listen on 8001')
})