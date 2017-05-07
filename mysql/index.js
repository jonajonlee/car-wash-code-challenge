const Mysql = require('promise-mysql');


const getPool = () => Mysql.createPool({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  database : 'jonathan_lee_car_wash'
})


module.exports = {
  getPool
}