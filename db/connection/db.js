var Sequelize = require('sequelize');
// var sequelize = new Sequelize('prism_johnson', 'prism_johnson', 'prism123!', {
//   dialect: 'mysql'
// })

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  define: config.sequelize.operatorsAliases
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;