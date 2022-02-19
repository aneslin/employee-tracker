const mysql = require('mysql2')



const db = mysql.createConnection(
  {host:'localhost',
  user: 'root',
  password: 'Xt86&Z%ft3yg',
  database: 'employee_tracker'
 }
)

module.exports = db