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

db.city_master = require('./city_master.js')(sequelize, Sequelize);
db.dealer = require('./dealer.js')(sequelize, Sequelize);
db.gallery = require('./gallery.js')(sequelize, Sequelize);
db.product_category = require('./product_category.js')(sequelize, Sequelize);
db.testimonial = require('./testimonial.js')(sequelize, Sequelize);
db.user = require('./user.js')(sequelize, Sequelize);
db.article = require('./article.js')(sequelize, Sequelize);
db.hindi_text_poc = require('./hindi_text_poc.js')(sequelize, Sequelize);

db.dealer.belongsTo(db.city_master, {foreignKey: 'city_id'});
db.user.belongsTo(db.city_master, {foreignKey: 'city_id'});
db.city_master.hasMany(db.dealer, {foreignKey: 'city_id'});

module.exports = db;