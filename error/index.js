
const CODE = {
  DOESNT_WANT     : 'DOES_NOT_WANT_CAR_WASH',
  REJECT_CHARGES  : 'REJECTED_CHARGES',
  STOLEN          : 'LICENSE_PLATE_REPORTED_STOLEN',
  DATABASE_FAILED : 'DATABASE_FAILED_TO_SAVE_RECORD',
  TRUCK_BED_OPEN  : 'TRUCK_BED_IS_OPEN',
}

const throwError = code => { throw new Error(code) }


module.exports = {
  throwDoesntWant     : () => throwError(CODE.DOESNT_WANT),
  throwRejectCharges  : () => throwError(CODE.REJECT_CHARGES),
  throwStolen         : () => throwError(CODE.STOLEN),
  throwDatabaseFailed : () => throwError(CODE.DATABASE_FAILED),
  throwTruckBedOpen   : () => throwError(CODE.TRUCK_BED_OPEN),
}