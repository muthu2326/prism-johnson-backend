/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reset_pasword_link_sent: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pincode: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stage_of_planning: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    reference: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    city_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false
    });
};
