/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testimonial', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    media_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    profession: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
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
    avatar_img_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    display_in_home_page: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'testimonial',
    timestamps: false
    });
};
