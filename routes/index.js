const express = require("express");
const router = express.Router();

const authService = require('../service/Auth')

router.post('/login',authService.login)


module.exports = router;

