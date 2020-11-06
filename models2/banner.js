/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banner', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    media_type: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reference: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'banner',
    timestamps: false
    });
};
