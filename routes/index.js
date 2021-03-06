const express = require("express");
const router = express.Router();

const authService = require('../service/Auth')
const auth = require('../model/Auth')
const {checkRegister} = require('../helper/middleware')
const userService = require('../service/User')
const {checkToken, verifyToken} = require ('../lib/jwt')
const transactionService = require('../service/Transaction')
const cartService = require('../service/ShoppingCart')

router.post('/login',authService.login)
router.post('/register', checkRegister, authService.register)
router.get('/authverify/:id', auth.registerVerification)
router.post('/forgetpassword',authService.forgetPassword)
router.post('/resetpassword/:id', auth.resetPassword)
router.post('/select', checkToken, userService.selectUser)
router.post('/editinformation', verifyToken, userService.editInformation)
router.post('/transaction-complete', checkToken, transactionService.selectTransactionComplete)
router.post('/transaction-on-payment', checkToken, transactionService.selectTransactionOnPayment)
router.post('/transaction-on-process', checkToken, transactionService.selectTransactionOnProcess)
router.post('/transaction-on-delivery', checkToken, transactionService.selectTransactionOnDelivery)
router.post('/transaction-cancel', checkToken, transactionService.selectTransactionCancel)
router.get('/detail-transaction-complete', transactionService.selectTransactionDetail)
router.get('/detail-transaction-on-payment', transactionService.selectTransactionDetail)
router.get('/detail-transaction-on-process', transactionService.selectTransactionDetail)
router.get('/detail-transaction-on-delivery', transactionService.selectTransactionDetail)
router.get('/detail-transaction-cancel', transactionService.selectTransactionDetail)
router.post('/payment-confirmation', transactionService.paymentConfirmation)
router.post('/shopping-cart',checkToken, cartService.selectCart)
router.post('/update-cart', cartService.updateCart)
router.post('/address', checkToken, cartService.selectAddress)
router.get('/warehouse', cartService.selectWarehouse)
router.post('/selected-warehouse', cartService.selectClosestWarehouse)
router.post('/create-transaction', cartService.createTransaction)
router.post('/create-transaction-detail', cartService.createTransactionDetail)
router.post('/delete-cart', cartService.deleteCart)

module.exports = router;

