const authModel = require('../model/Auth')
const jwt = require('../lib/jwt')



exports.login = async (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    }

    authModel.login(data)

        .then((result) => {
            console.log(result)
            if (result.length > 0) {
                let data = {
                    id: result[0].id_user,
                    username: result[0].username
                }
                res.json({
                    status: 'ok',
                    login: true,
                    token: jwt.Encode(data)
                })
            } else {
                res.json({
                    status: 'ok',
                    login: false
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 'error',
                error_message: err
            })
        })
}

// exports.register = async (req, res) => {

//     console.log(req.body.username)

//     let data = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     authModel.register(data)
//         .then(() => {
//             res.json({
//                 status: 'ok',
//                 message: "Successfully Register",
//                 data
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 status: 'error',
//                 message: "Failed to Register Account",
//                 error_message: err
//             })
//         })

// }

exports.register = async (req, res) => {

    let post = {
        full_name: req.body.full_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        status: 'UNVERIFIED'
    }

    console.log(post)

    authModel.register(post)
        .then(() => {
            res.json({
                status: 'ok',
                message: "Successfully Register",
                post,
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

exports.forgetPassword = async (req, res) => {
    let data = {    
        email : req.body.email,
        newPassword : req.body.newPassword
    }

    authModel.forgetPassword(data)

        .then((result) => {
            console.log(result)
            if (result.length > 0) {
                res.json({
                    status: 'ok',
                })
            } else {
                res.json({
                    message: "Email tidak terdaftar"
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 'error',
                error_message: err
            })
        })
}

