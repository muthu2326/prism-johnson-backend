var DataTypes = require("sequelize").DataTypes;
var _cities = require("./cities");
var _description_list = require("./description_list");
var _banner = require("./banner");
var _content = require("./content");
var _user = require("./user");
var _queries = require("./queries");

function initModels(sequelize) {
  var cities = _cities(sequelize, DataTypes);
  var description_list = _description_list(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var queries = _queries(sequelize, DataTypes);

  return {
    cities,
    description_list,
    banner,
    content,
    user,
    queries,
  };
}
module.exports = { initModels };
