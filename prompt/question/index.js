
const R        = require('ramda');
const Inquirer = require('inquirer');

const Helper   = require('../../helper');


var QUESTION = {
  CAR_WASH: [{
    type    : 'confirm',
    name    : 'input',
    message : 'Would you like a car wash?',
    default : true,
  }],

  LICENSE_PLATE: [{
    type     : 'input',
    name     : 'input',
    message  : 'Enter your license plate number',
    validate : Helper.LicensePlate.validate,
    filter   : Helper.LicensePlate.sanitize,
  }],

  VEHICLE_TYPE: [{
    type    : 'list',
    name    : 'input',
    message : 'Select your vehicle type',
    choices : ['Car', 'Truck'],
    filter  : Helper.VehicleType.sanitize,
  }],

  TRUCK_MUD: [{
    type    : 'confirm',
    name    : 'input',
    message : 'Do you have mud on your truck?',
    default : false,
  }],

  PAYMENT: [{
    type    : 'confirm',
    name    : 'input',
    message : 'Do you agree to the total?',
    default : true,
  }]
}


const _promptAndReturnInput = question =>
  () => Inquirer.prompt(question).then(R.prop('input'));


module.exports = {
  carWash      : _promptAndReturnInput(QUESTION.CAR_WASH),
  licensePlate : _promptAndReturnInput(QUESTION.LICENSE_PLATE),
  vehicleType  : _promptAndReturnInput(QUESTION.VEHICLE_TYPE),
  truckMud     : _promptAndReturnInput(QUESTION.TRUCK_MUD),
  payment      : _promptAndReturnInput(QUESTION.PAYMENT),
}
