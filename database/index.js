
const Bluebird = require('bluebird');
const Mysql    = require('promise-mysql');

const TABLE = {
  LICENSE_PLATE : 'license_plate',
  SALES         : 'sales'
}


const saveLicense = db => license_plate_no => {
  const sql    = `INSERT INTO ${TABLE.LICENSE_PLATE} (number) VALUES (?)`;
  const params = [license_plate_no];

  return db.query(sql, params).get('insertId');
}


const saveSale = db => (license_plate_id, total) => {
  const sql    = `INSERT INTO ${TABLE.SALES} (license_plate_id, total) VALUES (?, ?)`;
  const params = [license_plate_id, total]

  return db.query(sql, params).get('insertId');
}


const getLicenseByNumber = db => license_plate_no => {
  const sql    = `SELECT * FROM ${TABLE.LICENSE_PLATE} WHERE number = ?`;
  const params = [license_plate_no];

  return db.query(sql, [license_plate_no]).get(0);
}


const getSalesForLicenseNumber = db => license_plate_no => {
  const sql = `
    SELECT * FROM ${TABLE.SALES}
      JOIN ${TABLE.LICENSE_PLATE}
        ON license_plate_id = ${TABLE.LICENSE_PLATE}.id
    WHERE number = ?`;

  const params = [license_plate_no];

  return db.query(sql, params);
}


const getLicenseIdForNumber = db => license_plate_no =>
  getLicenseByNumber(db)(license_plate_no)
    .then(license_plate => {
      if (license_plate) return license_plate.id
      return saveLicense(db)(license_plate_no)
    })


module.exports = {
  saveLicense,
  saveSale,
  getLicenseByNumber,
  getSalesForLicenseNumber,
  getLicenseIdForNumber,
}