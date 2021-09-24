const pool = require("../config/db");

exports.selectAll = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT * FROM category ORDER BY id_category`;
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};