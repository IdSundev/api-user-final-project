const pool = require('../config/db')
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
                let data= {
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