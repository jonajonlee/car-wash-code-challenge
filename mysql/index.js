const Mysql = require('promise-mysql');


const getPool = () => Mysql.createPool({
  debug: true, // debugging only
  host: 'localhost',
  user: 'root',
  database: 'jonathan_lee_car_wash'
})


module.exports = {
  getPool
}