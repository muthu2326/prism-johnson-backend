/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credentials', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    field_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'credentials',
    timestamps: false
    });
};
