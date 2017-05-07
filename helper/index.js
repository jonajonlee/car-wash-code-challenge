
const R = require('ramda');


const print = msg => console.log('\n', msg, '\n');

const updateState = R.merge;



module.exports = {
  print,
  updateState,

  LicensePlate : require('./license_plate'),
  VehicleType  : require('./vehicle_type'),
}
