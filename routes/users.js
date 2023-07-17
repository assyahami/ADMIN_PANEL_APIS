var express = require('express');
const { loginUser } = require('../controllers/users.Controlle');
var router = express.Router();
const {body}=require("express-validator")


/* GET users listing. */
router.post('/login',[
 body('phone').notEmpty().withMessage("Please provide a phone number")
],loginUser);

module.exports = router;
