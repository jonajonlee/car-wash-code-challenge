
const Mysql2 = require('mysql2')

// for some reason, I can't get promise-mysql
// to work with npm migrate
const getPool = () => Mysql2.createPool({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  database : 'jonathan_lee_car_wash'
})


module.exports = { getPool }