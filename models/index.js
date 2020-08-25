var config = require('config');   
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  operatorsAliases: false,
  define: config.sequelize.options
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.dealer = require("./dealer.js")(sequelize, Sequelize);

module.exports = db;