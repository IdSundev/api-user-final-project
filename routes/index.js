const express = require("express");
const router = express.Router();

const authService = require('../service/Auth')
const auth = require('../model/Auth')
const {checkRegister} = require('../helper/middleware')
const userService = require('../service/User')
const {checkToken, verifyToken} = require ('../lib/jwt')

router.post('/login',authService.login)
router.post('/register', checkRegister, authService.register)
router.get('/authverify/:id', auth.registerVerification)
router.post('/forgetpassword',authService.forgetPassword)
router.post('/resetpassword/:id', auth.resetPassword)
router.post('/select', checkToken, userService.selectUser)
router.post('/editinformation', verifyToken, userService.editInformation)



module.exports = router;

