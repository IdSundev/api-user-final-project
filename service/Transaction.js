const transactionModel = require('../model/Transaction')
const uniqid = require('uniqid')
const platform = require('../platform')

exports.selectTransactionComplete = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    transactionModel.selectTransactionComplete(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.selectTransactionDetail = async (req,res) => {
    let data = {
        id_user: req.query.id_user,
        id_transaction: req.query.id_transaction
    }
    console.log('ini',data)

    transactionModel.selectTransactionDetail(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.selectTransactionOnPayment = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    transactionModel.selectTransactionOnPayment(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.selectTransactionOnProcess = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    transactionModel.selectTransactionOnProcess(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.selectTransactionOnDelivery = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    transactionModel.selecTransactionOnDelivery(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.selectTransactionCancel = async (req,res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    transactionModel.selectTransactionCancel(data)
    .then((result)=>{
        res.json({
            status: 'ok',
            data: result 
        })
    })
    .catch((err)=>{
        res.json({
            status: 'error',
            message: "Failed to Retrieve Data",
            error_message: err
        })
    })
}

exports.paymentConfirmation = async (req, res) => {

    let post = {
        id_transaction: req.body.id_transaction,
        payment_time: req.body.payment_time,
        total: req.body.total,
    }

    if (req.files){
        var file = req.files.image_payment_confirmation;
        console.log('INI',file)
        let filename = req.files.image_payment_confirmation.name

        var extension = req.files.image_payment_confirmation.name.split('.');
        extension = extension[extension.length - 1];
        filename = `${uniqid()}.${extension}`;

        console.log('alamat',platform.projectDir)

        file.mv(platform.projectDir + "/images/" + filename, function(err){
            if(err) console.log(err);
        })

        post.image_payment_confirmation= filename
    }

    console.log(post)

    transactionModel.paymentConfirmation(post)
        .then(() => {
            res.json({
                status: 'ok',
                message: "Payment Proof Submitted. Waiting for Verification",
                post,
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Submit Payment Proof",
                error_message: err
            })
        })
}