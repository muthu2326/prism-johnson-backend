/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sub_description', {
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
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sections',
        key: 'id'
      },
      unique: "fk_sub_section_id"
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      },
      unique: "fk_sub_product_id"
    },
    productcode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'content',
        key: 'id'
      },
      unique: "fk_sub_content_id"
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
    tableName: 'sub_description',
    timestamps: false
    });
};
