const pool = require("../config/db");

exports.selectAll = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT a.id_address, a.full_name, a.contact, a.pin_as, a.detail_address, a.other_detail, a.set_default, a.id_village, a.id_user, p.province, c.city, sd.sub_district, v.village FROM address as a INNER JOIN users as u ON a.id_user = u.id_user INNER JOIN village as v ON a.id_village = v.id_village INNER JOIN sub_district as sd ON v.id_sub_district = sd.id_sub_district INNER JOIN city as c ON sd.id_city = c.id_city INNER JOIN province as p ON c.id_province = p.id_province WHERE a.id_user = ${data.id_user} ORDER BY a.id_address DESC`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO address(id_user,id_village,detail_address,other_detail,pin_as,set_default,full_name,contact) values(${data.id_user},${data.id_village},'${data.detail_address}','${data.other_detail}','${data.pin_as}','FALSE','${data.full_name}','${data.contact}')`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.setDefaultAllFalse = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE address SET set_default="FALSE" WHERE id_user = ${data.id_user}`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.updateSetDefault = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE address SET set_default="TRUE" WHERE id_address = ${data.id_address}`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};