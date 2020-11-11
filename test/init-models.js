var DataTypes = require("sequelize").DataTypes;
var _banner = require("./banner");
var _articles = require("./articles");
var _content = require("./content");
var _dealer = require("./dealer");
var _credentials = require("./credentials");
var _city = require("./city");
var _product = require("./product");
var _product_mrp_list = require("./product_mrp_list");
var _sections = require("./sections");
var _orders = require("./orders");
var _quries = require("./quries");
var _user = require("./user");
var _sub_description = require("./sub_description");
var _state = require("./state");

function initModels(sequelize) {
  var banner = _banner(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);

  return {
    banner,
    articles,
    content,
    dealer,
    credentials,
    city,
    product,
    product_mrp_list,
    sections,
    orders,
    quries,
    user,
    sub_description,
    state,
  };
}
module.exports = { initModels };
