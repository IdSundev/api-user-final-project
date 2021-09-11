const pool = require('../config/db.js');


exports.login = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM users WHERE password = '${data.password}' AND username ='${data.username}' OR email = '${data.username}' `;

        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
        });
    });
};


