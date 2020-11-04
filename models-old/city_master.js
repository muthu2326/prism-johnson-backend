/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city_master', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    city_en: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    city_hi: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    state_en: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    state_hi: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'city_master'
  });
};
