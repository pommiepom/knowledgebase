const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(`
        <h2>KNOWLEDGEBASE</h2>

        <form action="/api/login" method="post">
            Username:<br>
            <input type="text" name="username" id="username">
            <br>
            Password:<br>
            <input type="password" name="password" id="password">
            <br><br>
            <input type="submit" value="LOGIN">
        </form>
    `)
})

module.exports = router