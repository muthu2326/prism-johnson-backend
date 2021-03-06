/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('content', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    griha_nirman_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grih_nirma_img_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contact_email: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    contact_toll_free_number: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    intro_description: {
      type: DataTypes.JSON,
      allowNull: true
    },
    banner_image_urls: {
      type: DataTypes.JSON,
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
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_how_it_works: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'content',
    timestamps: false
    });
};
