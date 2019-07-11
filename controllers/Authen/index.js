var jwt = require('jsonwebtoken');

const Authen = require('../../models/User')

exports.check = check = (token) => {
    token = token.replace("Bearer ", "");
    // console.log(token);
    decoded = jwt.verify(token, 'secret', { algorithm: 'HS512' })
    
    return Authen.find({ username: decoded.username }).exec()   
}