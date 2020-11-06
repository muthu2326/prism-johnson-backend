var Sequelize = require('sequelize');
var sequelize = new Sequelize('prism_johnson', 'prism_johnson', 'prism123!', {
  dialect: 'mysql'
})
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = sequelize;