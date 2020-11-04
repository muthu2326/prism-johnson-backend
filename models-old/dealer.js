/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dealer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name_en: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    name_hi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_en: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    address_hi: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    alternate_phone_1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'city_master',
        },
        key: 'id'
      },
      unique: "fk_dealer_city_id"
    },
    pin_code: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dealer'
  });
};
