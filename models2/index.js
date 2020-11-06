var config = require('config');   
var Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const log = require('../utils/logger').get();

//joining path of directory 
const directoryPath = path.join(__dirname, '');

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  define: config.sequelize.operatorsAliases
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.content = require('./content.js')(sequelize, Sequelize);
db.user = require('./user.js')(sequelize, Sequelize);

// db.dealer.belongsTo(db.city_master, {foreignKey: 'city_id'});
// db.user.belongsTo(db.city_master, {foreignKey: 'city_id'});
// db.city_master.hasMany(db.dealer, {foreignKey: 'city_id'});

module.exports = db;