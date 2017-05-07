const R        = require('ramda');
const Question = require('./question')


const carWash = db => state => Question.carWash()
  .then(wants_car_wash => R.merge(state, { wants_car_wash }))


const licensePlate = db => state => Question.licensePlate()
  .then(license_plate_number => R.merge(state, { license_plate_number }))


const vehicleType = db => state => Question.vehicleType()
  .then(vehicle_type => R.merge(state, { vehicle_type }))


const truckMud = db => state => Question.truckMud()
  .then(truck_has_mud => R.merge(state, { truck_has_mud }))


const getPayment = db => state => Question.payment()
  .then(agreed_to_charges => R.merge(state, { agreed_to_charges }))


module.exports = {
  carWash,
  licensePlate,
  vehicleType,
  truckMud,
  getPayment,
}
