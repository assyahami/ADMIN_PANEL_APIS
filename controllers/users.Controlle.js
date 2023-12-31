const Users = require("../models/users");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { signinAuthToken } = require("../utils/signAuthToken");

const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({message: errResp }, res)
        }
        let send = {}
        const body = req.body
        const findUser = await Users.findOne({ phone: body.phone }).select("id role name phone")
        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const authToken = await signinAuthToken(findUser.id, findUser.role)
        send.user = findUser
        send.token = authToken

        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}
module.exports = {
    loginUser
}

