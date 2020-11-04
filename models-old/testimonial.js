/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testimonial', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    customer_email: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    customer_phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'testimonial'
  });
};
