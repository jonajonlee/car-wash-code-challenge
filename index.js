'use strict';
const Inquirer = require('inquirer');
const R        = require('ramda');
const Helper   = require('./helper');

const Prompt = require('./prompt');

console.log('\nWelcome to Jon\'s Friendly Car Wash!\n');


const exit     = () => console.log('\nExiting.. Please pull backwards\n');
const rudeExit = () => console.log('\nExiting.. Get out of my face!\n');
const enter    = () => console.log('\nPurchase Complete\nDrive forward!\n');


const wake_up_car_wash_prompt = () => Prompt.carWash()
  .then(wants_car_wash => {
    if (wants_car_wash) return check_license_plate();
    return exit;
  })


// TODO: consider moving .then logic to a handlers file
const check_license_plate = () => Prompt.licensePlate()
  .then(license_plate_no => {

    if (!Helper.LicensePlate.isStolen(license_plate_no))
      // TODO: - Need to save to database and increment wash_count
      //       - and keep license_plate record in memory for later
      return get_vehicle_type()

    console.log('\nJon\'s Car Wash is not friendly to thieves!');
    return rudeExit()
  })


const get_vehicle_type = () => Prompt.vehicleType()
  .then(vehicle_type => {
    switch (vehicle_type) {
      case Helper.VehicleType.TYPE.CAR:
        get_payment();
        break;
      case Helper.VehicleType.TYPE.TRUCK:
        ask_truck_questions();
        break;
      default:
        console.log('\nInvalid Vehicle Type - are you a hacker?');
        exit();
    }
  })

// TODO: pass a "state" object through every function
const ask_truck_questions = () => Prompt.truckMud()
  .then(truck_has_mud => {
    console.log('\nWARNING: Your Truck Bed Door must be closed!\n');
    console.log('truck has mud! +$2!');
    return get_payment();
  }) 


const get_payment = () => {
  printInvoice();
  Prompt.payment()
    .then(agree_to_charges => {
      if (agree_to_charges) return enter()
      return exit();
    })
}


const printInvoice = state => {
  console.log('Invoice:', state);
}


wake_up_car_wash_prompt()
