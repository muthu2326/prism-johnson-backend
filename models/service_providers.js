/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_providers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    mobile_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "mobile_number_UNIQUE"
    },
    address: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    pin_code: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    branch: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    territory: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tehsil: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    firm_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    office_phone_with_STD_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    roles: {
      type: DataTypes.JSON,
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
    }
  }, {
    sequelize,
    tableName: 'service_providers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "mobile_number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_number" },
        ]
      },
    ]
  });
};
