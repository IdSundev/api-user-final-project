const pool = require("../config/db");

exports.selectProducts = (data) => {
  let sql
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ===""){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c WHERE p.id_category = c.id_category ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ==="name"){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c WHERE p.id_category = c.id_category ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory ==="" && data.orderBy ==="price"){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c WHERE p.id_category = c.id_category ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ===""){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ===""){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ===""){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' ORDER BY id_product DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ==="name"){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory ==="" && data.orderBy ==="price"){
    sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE name LIKE '%${data.filterName}%' ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ==="name"){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName ==="" && data.filterCategory !=="" && data.orderBy ==="price"){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ==="name"){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' ORDER BY name LIMIT ${data.position},${data.limit}`;
  }
  if(data.filterName !=="" && data.filterCategory !=="" && data.orderBy ==="price"){
    sql = `SELECT p.id_product, p.id_category, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c ON p.id_category = c.id_category WHERE p.id_category = ${data.filterCategory} AND p.name LIKE '%${data.filterName}%' ORDER BY price DESC LIMIT ${data.position},${data.limit}`;
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