
const MigrationHelper = require('../helper/migration')
const db = MigrationHelper.getPool()


const sql = `
  CREATE TABLE IF NOT EXISTS \`sales\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`license_plate_id\` int(11) unsigned NOT NULL,
  \`total\` float unsigned NOT NULL,
  PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`


module.exports = {
  up   : next => db.query(sql, next),
  down : next => db.query('DROP TABLE IF EXISTS `sales`', next)
}