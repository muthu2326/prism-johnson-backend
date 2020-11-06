/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      },
      unique: "fk_order_product_id"
    },
    productcode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dealer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'dealer',
        key: 'id'
      },
      unique: "fk_order__dealer_id"
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
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
    user_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    delivery_address: {
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
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updated_by_role: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false
    });
};
