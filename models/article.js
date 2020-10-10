/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    media_asset_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    media_asset_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    summary: {
      type: "TINYTEXT",
      allowNull: true
    },
    content: {
      type: "MEDIUMTEXT",
      allowNull: true
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    section_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'article'
  });
};