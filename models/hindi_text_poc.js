/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hindi_text_poc', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hindi_text_poc'
  });
};
