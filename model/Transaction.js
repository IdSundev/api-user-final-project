const pool = require('../config/db.js');

exports.selectTransactionComplete = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT t.id_transaction, t.id_user, t.payment_confirmation, t.order_time_complete, t.receipt_number, t.status, a.detail_address as user_address, t.total, w.detail_address as warehouse_address FROM transactions t JOIN address a ON t.id_address = a.id_address JOIN warehouse w ON t.id_warehouse = w.id_warehouse';
        if (data.id) {
            sql += ` where t.id_user = ${data.id} and t.status="COMPLETE" `
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectTransactionDetail = (data) => {
    return new Promise(function(resolve, reject) {
        var sql = `SELECT t.id_transaction, td.id_transaction_detail, t.id_user, t.total, td.id_product, td.quantity, p.name, p.price, c.category FROM transactions t JOIN transaction_detail td ON t.id_transaction = td.id_transaction JOIN products p ON td.id_product = p.id_product JOIN category c ON p.id_category = c.id_category WHERE t.id_transaction = ${data.id_transaction} AND t.id_user = ${data.id_user}`
        pool.query(sql, (err, result)=> {
            if (err) reject(err);

            resolve(result);
        });
    });
};

exports.selectTransactionOnPayment = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT t.id_transaction, t.id_user, t.payment_confirmation, t.order_time_complete, t.receipt_number, t.status, a.detail_address as user_address, t.total, w.detail_address as warehouse_address FROM transactions t JOIN address a ON t.id_address = a.id_address JOIN warehouse w ON t.id_warehouse = w.id_warehouse';
        if (data.id) {
            sql += ` where t.id_user = ${data.id} and t.status="PAY BEFORE" `
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectTransactionOnProcess = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT t.id_transaction, t.id_user, t.payment_confirmation, t.order_time_complete, t.receipt_number, t.status, a.detail_address as user_address, t.total, w.detail_address as warehouse_address FROM transactions t JOIN address a ON t.id_address = a.id_address JOIN warehouse w ON t.id_warehouse = w.id_warehouse';
        if (data.id) {
            sql += ` where t.id_user = ${data.id} and t.status="ON PROCESS" `
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selecTransactionOnDelivery = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT t.id_transaction, t.id_user, t.payment_confirmation, t.order_time_complete, t.receipt_number, t.status, a.detail_address as user_address, t.total, w.detail_address as warehouse_address FROM transactions t JOIN address a ON t.id_address = a.id_address JOIN warehouse w ON t.id_warehouse = w.id_warehouse';
        if (data.id) {
            sql += ` where t.id_user = ${data.id} and t.status="ON GOING/ DELIVERY" `
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.selectTransactionCancel = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = 'SELECT t.id_transaction, t.id_user, t.payment_confirmation, t.order_time_complete, t.receipt_number, t.status, a.detail_address as user_address, t.total, w.detail_address as warehouse_address FROM transactions t JOIN address a ON t.id_address = a.id_address JOIN warehouse w ON t.id_warehouse = w.id_warehouse';
        if (data.id) {
            sql += ` where t.id_user = ${data.id} and t.status="CANCELED" `
        }
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};

exports.paymentConfirmation = (post) => {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from transactions';
        if (post.id_transaction) {
            sql += ` where id_transaction = ${post.id_transaction}`
        }
        
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            
            console.log(post.total)
            console.log(result[0].total)

            if (result[0].total == post.total) {
                new Promise(function (resolve, reject) {

                    var sql = `UPDATE transactions SET payment_time = '${post.payment_time}', total = '${post.total}'`
                    if (post.image_payment_confirmation){
                        sql += `, image_payment_confirmation = '${post.image_payment_confirmation}'`
                    }
                    if (post.id_transaction){
                        sql += ` where id_transaction = '${post.id_transaction}'`
                    }

                    pool.query(sql, (err, result,res) => {
                        if (err) reject(err);

                        resolve(true);

                    });
                })
            } else {
                console.log('Amount Transfer Berbeda dengan Total Payment')
            }
        });
    });
};