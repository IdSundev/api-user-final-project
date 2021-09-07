const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit:100,
  host: 'localhost',
  user:'root',
  password:'Unstoppable_29',
  database:'e_commerce_pd',
  port: 3306
})

module.exports = pool;