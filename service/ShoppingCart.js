const cartModel = require('../model/ShoppingCart')

exports.selectCart = async (req, res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    cartModel.selectCart(data)
        .then((result) => {
            res.json({
                status: 'ok',
                data: result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Retrieve Data",
                error_message: err
            })
        })
}

exports.updateCart = async (req, res) => {
    let data = {
        quantity: req.body.quantity,
        index: req.body.index,
        id_cart_detail: req.body.id_cart_detail
    }
    console.log(data)

    cartModel.updateCart(data)
        .then((result) => {
            res.json({
                status: 'ok',
                data: result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Retrieve Data",
                error_message: err
            })
        })
}

exports.selectAddress = async (req, res) => {
    let data = {
        id: req.user.id
    }
    console.log(data)

    cartModel.selectAddress(data)
        .then((result) => {
            res.json({
                status: 'ok',
                data: result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Retrieve Data",
                error_message: err
            })
        })
}

exports.selectWarehouse = async (req, res) => {

    cartModel.selectWarehouse()
        .then((result) => {
            res.json({
                status: 'ok',
                data: result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Retrieve Data",
                error_message: err
            })
        })
}

exports.selectClosestWarehouse = async (req, res) => {

    let data = {
        id: req.body.id_warehouse
    }
    console.log('datanya', data)

    cartModel.selectClosestWarehouse(data)
        .then((result) => {
            res.json({
                status: 'ok',
                data: result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Retrieve Data",
                error_message: err
            })
        })
}

exports.createTransaction = async (req, res) => {

    let post = {
        id_user: req.body.id_user,
        id_address: req.body.id_address,
        id_warehouse: req.body.id_warehouse,
        status: 'PAY BEFORE',
        total: req.body.total
    }

    console.log(post)

    cartModel.createTransaction(post)
        .then((result) => {
            res.json({
                status: 'ok',
                message: "Successfully Register",
                post,
                result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Register Account",
                error_message: err
            })
        })
}

exports.createTransactionDetail = async (req, res) => {

    let post = {
        id_transaction: req.body.id_transaction,
        id_product: req.body.id_product,
        quantity: req.body.quantity
    }

    console.log(post)

    cartModel.createTransactionDetail(post)
        .then((result) => {
            res.json({
                status: 'ok',
                message: "Successfully Add Transaction Detail",
                post,
                result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Add Transaction Detail",
                error_message: err
            })
        })
}

exports.deleteCart = async (req, res) => {

    let post = {
        id_user: req.body.id_user
    }

    console.log(post)

    cartModel.deleteCart(post)
        .then((result) => {
            res.json({
                status: 'ok',
                message: "Succesfully Delete Cart",
                post,
                result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Delete Cart",
                error_message: err
            })
        })
}

exports.addProductToCart = async (req, res) => {

    let post = {
        id_user: req.user.id,
        id_product: req.body.id_product,
        quantity: 1
    }

    console.log('ini post', post)

    cartModel.addProductToCart(post)
        .then((result) => {
            res.json({
                status: 'ok',
                message: "Successfully Register",
                post,
                result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Register Account",
                error_message: err
            })
        })
}

exports.deleteProductFromCart = async (req, res) => {

    let post = {
        id_cart_detail: req.body.id_cart_detail,
    }

    console.log('ini post', post)

    cartModel.deleteProductFromCart(post)
        .then((result) => {
            res.json({
                status: 'ok',
                message: "Successfully Deleted",
                post,
                result
            })
        })
        .catch((err) => {
            res.json({
                status: 'error',
                message: "Failed to Delete",
                error_message: err
            })
        })
}