/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dealer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    region: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    territory: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    dealer_code: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "dealer_code_UNIQUE"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    reset_pasword_link_sent: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    lang: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    contact_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cities: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dealer',
    timestamps: false
    });
};
