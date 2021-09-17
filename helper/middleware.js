const { response } = require("express");
const pool = require('../config/db.js');

const checkRegister = async (req, res, next) => {
    try {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        const data = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        new Promise(function (resolve, reject) {
            console.log(data.username)
            var sql = `select * from users where email = '${data.email}' or username = '${data.username}' `;
            pool.query(sql, (err, result) => {
                if (err) reject(err);

                resolve(result);
                // console.log(result)

                if (result.length > 0) {
                    return res.send({
                        message:
                            "User accont has been registered. Please use different email and username",
                    });
                } else {
                    if (
                        data.username.length >= 6 &&
                        emailRegex.test(data.email) &&
                        passRegex.test(data.password)
                    ) {
                        next();
                    } else {
                        return res.send({
                            message:
                                "Invalid Information. Email has to be valid. Username must contain minimum 6 characters. Password must contain minum 6 characters, a number, and a special character",
                        });
                    }
                }
            });
        });

        console.log(emailRegex.test(data.email))
        console.log(passRegex.test(data.password))

    } catch (err) {
        console.log(err);
        return res.send(err.message);
    }
};

module.exports = { checkRegister};