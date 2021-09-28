const pool = require('../config/db.js');

const nodemailer = require('nodemailer')

let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "purwadhika.electronic@gmail.com",
        pass: "Purwadhika123!"
    }

})

var rand, mailOption, host, link


exports.login = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM users WHERE password = '${data.password}' AND username ='${data.username}' `;

        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            
        });
    });
};

exports.register = (post) => {
    return new Promise(function(resolve, reject) {
        var sql = 'insert into users set ?';
        pool.query(sql, [post], (err, result)=> {
            if (err) reject(err);

            resolve(true);
            
            if(result){
                rand = Math.floor((Math.random() * 100000)+54)
                host= "localhost:3001"
                link = "http://" + host + "/authverify/" + rand
                mailOption = {
                    to: post.email,
                    subject: "Verification Email",
                    html: "Hello,<br> Please Click Verification Link Below <br> " +
                    "<a href=" + link + "> Click here to verify account </a>"
                }
                smtpTransport.sendMail(mailOption, (err, res)=>{
                    if(err){
                        console.log(err)
                    } else{
                        res.json({
                            status: 'Berhasil Menambahkan Data Baru'
                        })
                    }
                })
            }
        });
    });
};

exports.registerVerification = async (req, res) => {

    try {

        if ((req.protocol + "://" + req.get('host')) == 'http://' + host) {
            if (req.params.id == rand) {
                new Promise(function (resolve, reject) {

                    var sql = `UPDATE users SET status = 'VERIFIED' WHERE email='${mailOption.to}'`
                    pool.query(sql, (err, result) => {
                        if (err) reject(err);

                        resolve(true);

                        if (result) {
                            return res.send({
                                status: "Verification Success"
                            });
                        }


                    });
                })
            }
        } else {
            console.log('Error')
        }

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }


}

exports.forgetPassword = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM users WHERE email ='${data.email}' `;
        console.log(data.email)

        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);

            if(result){
                rand = Math.floor((Math.random() * 100000)+54)
                host= "localhost:3000"
                link = "http://" + host + "/resetpassword/" + rand
                mailOption = {
                    to: data.email,
                    subject: "Reset Password",
                    html: "Hello,<br> Please Click Link Below to Reset Password <br> " +
                    "<a href=" + link + "> Click here to verify account </a>"
                }
                smtpTransport.sendMail(mailOption, (err)=>{
                    if(err){
                        console.log(err)
                    } else{
                        new Promise(function (resolve, reject) {

                            var sql = `UPDATE users SET rand = '${rand}' WHERE email='${mailOption.to}'`
                            pool.query(sql, (err, result) => {
                                if (err) reject(err);
        
                                resolve(true);
        
        
                            });
                        })
                    }
                })
            }


            
        });
    });
};

exports.resetPassword = async (req, res) => {

    try {

        let data = {    
            newPassword : req.body.newPassword,
            confirmPassword : req.body.confirmPassword,
            rand: req.params.id
        }

        console.log('ini',data)

        new Promise(function (resolve, reject) {
            var sql = `SELECT * FROM users WHERE rand = '${data.rand}' `;
    
            pool.query(sql, (err, result) => {
                if (err) reject(err);
    
                resolve(result);
                console.log(result[0].email)

                if(result){
                    if (data.newPassword == data.confirmPassword){
                        new Promise(function (resolve, reject) {
    
                            var sql = `UPDATE users SET password ='${data.newPassword}' WHERE email='${result[0].email}'`
                            pool.query(sql, (err, result) => {
                                if (err) reject(err);
        
                                resolve(true);
        
                                if (result) {
                                    return res.json({
                                        status: "Reset Password Success"
                                    });
                                }
        
        
                            });
                        })
                    } else {
                        res.json({
                            status: "Password Tidak Sama"
                        })
                    }

                }
                
            });
        });

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }


}





