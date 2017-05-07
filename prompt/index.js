
const R = require('ramda');
const Inquirer = require('inquirer');

const Helper = require('../helper');


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

// TODO: Consider abstracting
const carWash = () =>
  Inquirer.prompt(QUESTION.CAR_WASH).then(R.prop('input'));

const licensePlate = () =>
  Inquirer.prompt(QUESTION.LICENSE_PLATE).then(R.prop('input'));

const vehicleType = () =>
  Inquirer.prompt(QUESTION.VEHICLE_TYPE).then(R.prop('input'));

const truckMud = () =>
  Inquirer.prompt(QUESTION.TRUCK_MUD).then(R.prop('input'));

const payment = () =>
  Inquirer.prompt(QUESTION.PAYMENT).then(R.prop('input'));

module.exports = {
  carWash,
  licensePlate,
  vehicleType,
  truckMud,
  payment,
}
