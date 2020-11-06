/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('queries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    product: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    stage_of_construction: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(500),
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
    reference: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      unique: "fk_queries_1"
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
    tableName: 'queries',
    timestamps: false
    });
};
