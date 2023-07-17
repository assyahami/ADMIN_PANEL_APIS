const Users = require("../models/users");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { signinAuthToken } = require("../utils/signAuthToken");

const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return APIRES.getErrorResult({ errors: errors.mapped() }, res)
        }
        let send={}
        const body = req.body
        const findUser=await Users.findOne({phone:body.phone}).select("id role name phone")
        const authToken=await signinAuthToken(findUser.id,findUser.role)
        send.user=findUser
        send.token=authToken
        
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}
module.exports = {
    loginUser
}

