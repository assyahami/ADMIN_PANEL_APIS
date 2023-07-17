const jwt = require("jsonwebtoken");
let secretKey = process.env.SECRET
let expiresIn = process.env.DEV_ACCESS_TOKEN_EXPIRESIN

function signinAuthToken(id, role) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: expiresIn,
            issuer: 'medicalshala',
            audience: id,
        };
        jwt.sign({ user_id: id, role }, secretKey, options, (err, token) => {
            if (err) {
                reject({ isError: true, message: 'Invalid operation!' });
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    signinAuthToken
}