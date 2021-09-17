const express = require("express");
const router = express.Router();

const authService = require('../service/Auth')
const auth = require('../model/Auth')
const {checkRegister} = require('../helper/middleware')

router.post('/login',authService.login)
router.post('/register', checkRegister, authService.register)
router.get('/authverify/:id', auth.registerVerification)
router.post('/forgetpassword',authService.forgetPassword)
router.post('/resetpassword/:id', auth.resetPassword)


module.exports = router;

