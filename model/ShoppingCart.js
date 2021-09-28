const pool = require('../config/db.js');

exports.selectCart = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT c.id_cart, cd.id_cart_detail, c.id_user, cd.id_cart_detail, cd.id_product, cd.quantity, p.id_category, p.name, p.price, p.picture, p.description, ct.category FROM cart c JOIN cart_detail cd ON c.id_cart = cd.id_cart JOIN products p ON cd.id_product = p.id_product JOIN category ct ON p.id_category = ct.id_category';
        if (data.id) {
            sql += ` where c.id_user = ${data.id}`
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.updateCart = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `UPDATE cart_detail SET quantity = '${data.quantity}'`;
        
        if (data.id_cart_detail) {
            sql += ` where id_cart_detail = ${data.id_cart_detail}`
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectAddress = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT a.id_address, a.id_user, a.id_village, a.detail_address, a.other_detail, a.pin_as, a.full_name, a.contact, v.village, v.postal_code, v.lat, v.lon FROM address a JOIN village v on a.id_village = v.id_village';
        if (data.id) {
            sql += ` where a.id_user = ${data.id}`
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectWarehouse = () => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT w.id_warehouse, w.id_village, w.detail_address, w.other_detail, v.lat, v.lon FROM warehouse w JOIN village v ON w.id_village = v.id_village;';
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectClosestWarehouse = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT w.id_warehouse, w.id_village, w.detail_address, w.other_detail, v.lat, v.lon FROM warehouse w JOIN village v ON w.id_village = v.id_village';
        if (data.id) {
            sql += ` where w.id_warehouse = ${data.id}`
        }
        console.log(sql)
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.createTransaction = (post) => {
    return new Promise(function(resolve, reject) {
        var sql = 'insert into transactions set ?';
        pool.query(sql, [post], (err, result)=> {
            if (err) reject(err);

            resolve(result);
            
        });
    });
};

exports.createTransactionDetail = (post) => {
    return new Promise(function(resolve, reject) {
        var sql = 'insert into transaction_detail set ?';
        pool.query(sql, [post], (err, result)=> {
            if (err) reject(err);

            resolve(result);
            
        });
    });
};

exports.deleteCart = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `DELETE FROM cart WHERE id_cart = '${data.id_user}'`;
        console.log(sql)
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};



