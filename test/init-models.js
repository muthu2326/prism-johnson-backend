var DataTypes = require("sequelize").DataTypes;
var _articles = require("./articles");
var _content = require("./content");
var _banner = require("./banner");
var _credentials = require("./credentials");
var _dealer = require("./dealer");
var _orders = require("./orders");
var _sections = require("./sections");
var _city = require("./city");
var _quries = require("./quries");
var _product_mrp_list = require("./product_mrp_list");
var _product = require("./product");
var _state = require("./state");
var _user = require("./user");
var _sub_description = require("./sub_description");

function initModels(sequelize) {
  var articles = _articles(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);

  return {
    articles,
    content,
    banner,
    credentials,
    dealer,
    orders,
    sections,
    city,
    quries,
    product_mrp_list,
    product,
    state,
    user,
    sub_description,
  };
}
module.exports = { initModels };
