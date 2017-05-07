const R = require('ramda');

const LICENSE_PLATE_REGEX = /(\w|\d){7}/i;

const STOLEN_PLATES = [ '1111111' ];


const validate = R.test(LICENSE_PLATE_REGEX);
const sanitize = R.toUpper;
const isStolen = R.contains(R.__, STOLEN_PLATES);


module.exports = {
  validate,
  sanitize,
  isStolen
}