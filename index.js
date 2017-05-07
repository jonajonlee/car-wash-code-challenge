'use strict';
const Bluebird = require('bluebird');
const Inquirer = require('inquirer');
const R        = require('ramda');

const Database = require('./database');
const ErrorLib = require('./error');
const Helper   = require('./helper');
const Mysql    = require('./mysql');
const Prompt   = require('./prompt');

const TRUCK_MUD_COST = 2;
const TRUCK_COST = 10;
const CAR_COST = 5;
const DISCOUNT = 0.5;

const printExit            = () => Helper.print('Exiting.. Please pull backwards');
const printEnter           = () => Helper.print('Purchase Complete!\n Please Drive forward!');
const printTruckBedWarning = () => Helper.print('  Warning: All trucks must have bed door closed.');


const start = db => Bluebird.resolve({})
  .then(Prompt.carWash(db))
  .then(state => {
    if (!state.wants_car_wash) ErrorLib.throwDoesntWant()
    return Prompt.licensePlate(db)(state) 
  })

  .then(state => {
    if (Helper.LicensePlate.isStolen(state.license_plate_number)) ErrorLib.throwStolen()
    return Database.getLicenseIdForNumber(db)(state.license_plate_number)
      .then(license_plate_id => R.merge(state, { license_plate_id }))
  })

  .then(Prompt.vehicleType(db))

  .then(state => {
    if (state.vehicle_type == Helper.VehicleType.TYPE.TRUCK)
      return Prompt.truckBedDoor(db)(state)
        .then(state => {
          if (!state.truck_bed_door_closed) ErrorLib.throwTruckBedOpen()
          return Prompt.truckMud(db)(state)

        })
    return state
  })

  .then(state =>
    Database.getSalesForLicenseNumber(db)(state.license_plate_number)
      .then(R.length)
      .then(wash_count => R.merge(state, { discounted: wash_count == 1 }))
  )

  .then(state => {
    let total = 0;

    console.log('')
    console.log('\n\n############ INVOICE ############\n\n')

    if (state.vehicle_type == Helper.VehicleType.TYPE.TRUCK) {
      console.log(`TRUCK......................$${TRUCK_COST}`)
      total = TRUCK_COST

      if (state.truck_has_mud) {
        console.log(`MUD DEEP CLEAN.............$${TRUCK_MUD_COST}`)
        total += TRUCK_MUD_COST
      }

    } else {
      console.log(`CAR.........................$${CAR_COST}`)
      total += CAR_COST
    }

    if (state.discounted) {
      console.log(`2ND PURCHASE DISCOUNT......${DISCOUNT*100}%`)
      total = total * DISCOUNT;
    }

    console.log(`\nTOTAL.......................$${total}`)

    console.log('\n\n#################################\n\n')

    return R.merge(state, { total });
  })

  .then(Prompt.getPayment(db))

  .then(state => {
    if (!state.agreed_to_charges) ErrorLib.throwRejectCharges()
    return Database.saveSale(db)(state.license_plate_id, state.total)
      .then(sale_id => {
        if (!sale_id) ErrorLib.throwDatabaseFailed()
        return R.merge(state, { sale_id })
      })
  }) 

  .then(() => {
    printEnter()
    process.exit()
  })

  .catch(err => {
    printExit();
    process.exit()
  })


Helper.print('Welcome to Jon\'s Friendly Car Wash!');
start(Mysql.getPool());
