const jwt = require('jsonwebtoken')

module.exports = (req) => {

    const token = req.headers['x-token'] || req.headers['x-access-token'] ||
        req.headers['authorization'] || req.headers['jwt'] || req.cookies['jwt'] || req.signedCookies['jwt']

    if (token == null) {
        let err = new Error("null token");
        err.statusCode = 401;
        throw err
    }

    if (token.substring(0, 7) == "Bearer ") {
        token = token.slice(7)
    }

    const decoded = jwt.verify(token, 'secret', {
        algorithm: 'HS512'
    })

    return decoded.username
}