/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      unique: "fk_user_id"
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    productcode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      },
      unique: "fk_product_id"
    },
    stage_of_construction: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    preferred_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status_description: {
      type: DataTypes.TEXT,
      allowNull: true
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
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quries',
    timestamps: false
    });
};
