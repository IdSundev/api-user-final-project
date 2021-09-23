const pool = require('../config/db.js');

exports.selectUser = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from users';
        if (data.id) {
            sql += ` where id_user = ${data.id}`
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.editInformation = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from users';
        if (data.id) {
            sql += ` where id_user = ${data.id}`
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(data.newPassword)
            console.log(data.profile)

            if (result) {
                new Promise(function (resolve, reject) {

                    var sql = `UPDATE users SET full_name = '${data.full_name}', birth_of_date = '${data.birth_of_date}', gender = '${data.gender}', contact = '${data.contact}'`
                    if (data.newPassword) {
                        sql += `, password = '${data.newPassword}'`
                    }
                    if (data.profile){
                        sql += `, profile = '${data.profile}'`
                    }
                    if (data.id) {
                        sql += ` where id_user = ${data.id}`
                    }

                    pool.query(sql, (err, result,res) => {
                        if (err) reject(err);

                        resolve(true);

                    });
                })
            }
        });
    });
};