'use strict';
const Inquirer = require('inquirer');
const R        = require('ramda');

const Database = require('./database');
const Helper   = require('./helper');
const Mysql    = require('./mysql');
const Prompt   = require('./prompt');

Helper.print('Welcome to Jon\'s Friendly Car Wash!');

const DISCOUNTED = true;

const printExit            = () => Helper.print('Exiting.. Please pull backwards');
const printEnter           = () => Helper.print('Purchase Complete!\n Please Drive forward!');
const printTruckBedWarning = () => Helper.print('  Warning: All trucks must have bed door closed.');



const start = db => Prompt.carWash()
  .then(wants_car_wash => {
    wants_car_wash ? check_license_plate(db) : printExit()
  })


// TODO: consider moving .then logic to a handlers file
const check_license_plate = (db) => Prompt.licensePlate()
  .then(license_plate_no => {
 
    if (Helper.LicensePlate.isStolen(license_plate_no)) {
      printExit();
      return Bluebird.resolve(null);
    } else {
      // TODO: - Need to save to database and increment wash_count
      //       - and keep license_plate record in memory for later
      let state = { license_plate_no };
 
      return Database.getLicenseByNumber(db)(license_plate_no)
        .tap(res => {
          if (res)
            state = R.merge(state, {license_plate_id: res.id});
        })
        .then(R.unless(R.identity, () => Database.saveLicense(db)(license_plate_no)
          .tap(license_plate_id => { state = R.merge(state, {license_plate_id}) })
          .tap(R.when(R.isNil, () => { throw new Error('DATABASE_SAVE_FAILED') }))
        ))
        .then(() => get_vehicle_type(db)(state))


      // get_vehicle_type(state);
    }
  })


const get_vehicle_type = db => state => Prompt.vehicleType()
  .then(vehicle_type => {

    const updated_state = Helper.updateState(state, { vehicle_type });

    switch (vehicle_type) {
      case Helper.VehicleType.TYPE.CAR:
        get_payment(db)(updated_state);
        break;

      case Helper.VehicleType.TYPE.TRUCK:
        printTruckBedWarning(); // consider changing to prompt
        ask_truck_questions(db)(updated_state);
        break;

      default:
        console.log('\nInvalid Vehicle Type');
        printExit();
    }
  })


const ask_truck_questions = db => state => Prompt.truckMud()
  .then(truck_has_mud => {
    const updated_state = Helper.updateState(state, { truck_has_mud })
    get_payment(db)(updated_state);
  }) 


const get_payment = db => state =>
  Database.getSalesForLicenseNumber(db)(state.license_plate_no)
    .then(R.length)
    .then(wash_count => calculate_total(state, wash_count == 1))
    .then(total => {
      const updated_state = Helper.updateState(state, {total});
      Prompt.payment(updated_state)
        .then(agree_to_charges => {
          if (agree_to_charges) {
            return Database.saveSale(db)(updated_state.license_plate_id, updated_state.total)
              .tap(R.when(R.isNil, () => { throw new Error('DATABASE_SAVE_FAILED') }))
          } else {
            printExit();
            return Bluebird.resolve(null)
          }
        })
    })


const calculate_total = (state, discounted = false) => {
  console.log('Invoice:', state);

  let total = 0;

  if (state.vehicle_type == 'truck')
    total = total + 10;

  total = total + 5;

  if (state.truck_has_mud)
    total = total + 2

  if (discounted)
    total = total*.5

  console.log('debugI2', total)

  return total
}


start(Mysql.getPool());
