const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    try {
        const reqHeaders = req.headers['authorization']
        if (!reqHeaders) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
        let token = reqHeaders.split('Bearer')[1].trim()
        
        if (!token) {
            return res.status(401).json({
                message: 'UnAuthorized',
                status: 'fail',
            });
        }
        let dummy="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRiNTExNDEzMDdmZDI5NjdhNWU4ZDc2IiwiaWF0IjoxNjg5Njc4NTM0LCJleHAiOjE2ODk4NTEzMzQsImF1ZCI6IjY0YjUxMTQxMzA3ZmQyOTY3YTVlOGQ3NiIsImlzcyI6Im1lZGljYWxzaGFsYSJ9.XSozyzST7oXAn5ISufG8DL089epcv3JfGOA6XOiIIfg"
        const decode = jwt.verify(token, process.env.SECRET)
        console.log(decode, 'decode');
        req.user=decode
        next()
    } catch (error) {
        console.log(error, 'eror');
        res.status(401).json({
            message: error.message,
            status: 'fail',
        });
    }
}
module.exports = {
    verifyToken
}