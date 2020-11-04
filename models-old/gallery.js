/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gallery', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    media_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    media_url: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'gallery'
  });
};
