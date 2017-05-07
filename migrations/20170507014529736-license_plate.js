
const MigrationHelper = require('../helper/migration')

const db = MigrationHelper.getPool()

const sql = `
  CREATE TABLE IF NOT EXISTS \`license_plate\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`number\` varchar(24) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`ui_n\` (\`number\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`

module.exports = {
  up   : next => db.query(sql, next),
  down : next => db.query('DROP TABLE IF EXISTS `license_plate`', next)
}



