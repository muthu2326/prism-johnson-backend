/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city_master', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    pin_code: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'city_master'
  });
};
