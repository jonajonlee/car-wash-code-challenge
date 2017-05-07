
const R = require('ramda');


const TYPE = {
  CAR   : 'car',
  TRUCK : 'truck',
}


const sanitize = R.toLower;


module.exports = {
  TYPE,
  sanitize
}