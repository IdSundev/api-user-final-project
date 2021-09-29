const { result } = require('lodash');
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
    return new Promise(function (resolve, reject) {
        var sql = 'insert into transactions set ?';
        pool.query(sql, [post], (err, result) => {
            if (err) reject(err);

            resolve(result);

        });
    });
};

exports.createTransactionDetail = (post) => {
    return new Promise(function (resolve, reject) {
        var sql = 'insert into transaction_detail set ?';
        pool.query(sql, [post], (err, result) => {
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

// exports.addProductToCart = (post) => {
//     return new Promise(function (resolve, reject) {
//         var sql = `INSERT INTO cart (id_user) VALUES (${post.id_user});`;
//         pool.query(sql, (err, result) => {
//             if (err) reject(err);

//             resolve(result);
//             console.log('ini', result.insertId)

//             if (result.insertId) {
//                 let data = {
//                     id_product: post.id_product,
//                     quantity: 1,
//                     id_cart: result.insertId
//                 }

//                 console.log('ini data', data)

//                 new Promise(function (resolve, reject) {
//                     var sql = 'insert into cart_detail set ?';
//                     pool.query(sql, [data], (err, result) => {
//                         if (err) reject(err);

//                         resolve(result);

//                     });
//                 })
//             }

//         });



//     });
// };

exports.addProductToCart = (post) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM cart WHERE id_user = '${post.id_user}'`;
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log('ini', result)


            if (result.length !== 0) {
                let id_cart = result[0].id_cart
                console.log('id_cart', id_cart)
                console.log('post id product', post.id_product)
                new Promise(function (resolve, reject) {
                    var sql = `SELECT * FROM cart_detail WHERE id_product = '${post.id_product}'`;
                    pool.query(sql, (err, result) => {
                        if (err) reject(err);

                        resolve(result);

                        console.log('ini result untuk add', result)

                        // console.log('select cart product', result[0].quantity)

                        if (result.length !== 0) {
                            let data = {
                                id_product: result[0].id_product,
                                id_cart: result[0].id_cart,
                                quantity: result[0].quantity + 1
                            }

                            console.log('data baru', data)

                            new Promise(function (resolve, reject) {
                                var sql = `UPDATE cart_detail SET quantity=${data.quantity} WHERE id_product =${data.id_product}`;
                                pool.query(sql, [data], (err, result) => {
                                    if (err) reject(err);

                                    resolve(result);

                                });
                            })

                        } else if(result.length==0) {

                            let data = {
                                id_product: post.id_product,
                                id_cart: id_cart,
                                quantity: post.quantity
                            }
                            new Promise(function (resolve, reject) {
                                var sql = 'insert into cart_detail set ?';
                                pool.query(sql, [data], (err, result) => {
                                    if (err) reject(err);

                                    resolve(result);

                                });
                            })
                        }
                    });

                })
            } else {
                new Promise(function (resolve, reject) {
                    var sql = `INSERT INTO cart (id_user) VALUES (${post.id_user});`;
                    pool.query(sql, (err, result) => {
                        if (err) reject(err);

                        resolve(result);
                        console.log('ini', result.insertId)

                        if (result.insertId) {
                            let data = {
                                id_product: post.id_product,
                                quantity: 1,
                                id_cart: result.insertId
                            }

                            console.log('ini data', data)

                            new Promise(function (resolve, reject) {
                                var sql = 'insert into cart_detail set ?';
                                pool.query(sql, [data], (err, result) => {
                                    if (err) reject(err);

                                    resolve(result);

                                });
                            })
                        }

                    });

                });
            }

        });



    });
};

exports.deleteProductFromCart = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `DELETE FROM cart_detail WHERE id_cart_detail = '${data.id_cart_detail}'`;
        console.log(sql)
        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            console.log(result)
        });
    });
};



