var DataTypes = require("sequelize").DataTypes;
var _banner = require("./banner");
var _cities = require("./cities");
var _content = require("./content");
var _queries = require("./queries");
var _user = require("./user");
var _description_list = require("./description_list");

function initModels(sequelize) {
  var banner = _banner(sequelize, DataTypes);
  var cities = _cities(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var queries = _queries(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var description_list = _description_list(sequelize, DataTypes);

  return {
    banner,
    cities,
    content,
    queries,
    user,
    description_list,
  };
}
module.exports = { initModels };
