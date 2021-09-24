const pool = require("../config/db");

exports.selectProducts = (data) => {
  let sql
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ===""){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category GROUP BY id_product ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ==="name"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category GROUP BY id_product ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ==="price"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category GROUP BY id_product ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ===""){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ===""){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} GROUP BY id_product ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ===""){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ==="name"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ==="price"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ==="name"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} GROUP BY id_product ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ==="price"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} GROUP BY id_product ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ==="name"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ==="price"){
    sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' GROUP BY id_product ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.countProducts = (data) => {
  let sql
  if(data.filterName !== "" && data.filterCategory !== ""){
    sql = `SELECT COUNT(*) AS 'amountOfData' FROM products WHERE name LIKE '%${data.filterName}%' AND id_category=${data.filterCategory}`;
  }
  if(data.filterName !== "" && data.filterCategory === ""){
    sql = `SELECT COUNT(*) AS 'amountOfData' FROM products WHERE name LIKE '%${data.filterName}%'`;
  }
  if(data.filterName === "" && data.filterCategory !== ""){
    sql = `SELECT COUNT(*) AS 'amountOfData' FROM products WHERE id_category=${data.filterCategory}`;
  }
  if(data.filterName === "" && data.filterCategory === ""){
    sql = `SELECT COUNT(*) AS 'amountOfData' FROM products`;
  }
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.detail = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT so.id_product, SUM(so.available) as available, p.name, p.price, p.picture, c.category FROM stock_operasional as so INNER JOIN products as p ON so.id_product = p.id_product INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_product = ${data.id} GROUP BY id_product`
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  })
}