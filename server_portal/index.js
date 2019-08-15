require('dotenv').config()
// require('./libs/MongoDBConnect')()

const express = require('express');
const app = express()
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(cookieParser({}))

// app.use((req, res, next) => {
//     console.log(req.method + " " + req.originalUrl)
//     // console.log('cookies:', req.cookies)
//     next()
// })

// app.use(require('./routes'))

app.get('/', (req, res) => {
    console.log(process.env)
    res.send('hello')
})

app.listen(process.env.portal_port, () => {
    console.log(`Server listen on ${process.env.portal_port}`)
})