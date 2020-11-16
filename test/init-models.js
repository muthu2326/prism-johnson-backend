var DataTypes = require("sequelize").DataTypes;
var _articles = require("./articles");
var _banner = require("./banner");
var _dealer = require("./dealer");
var _credentials = require("./credentials");
var _city = require("./city");
var _product = require("./product");
var _product_mrp_list = require("./product_mrp_list");
var _quries = require("./quries");
var _content = require("./content");
var _orders = require("./orders");
var _sections = require("./sections");
var _testimonial = require("./testimonial");
var _state = require("./state");
var _sub_description = require("./sub_description");
var _user = require("./user");

function initModels(sequelize) {
  var articles = _articles(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  return {
    articles,
    banner,
    dealer,
    credentials,
    city,
    product,
    product_mrp_list,
    quries,
    content,
    orders,
    sections,
    testimonial,
    state,
    sub_description,
    user,
  };
}
module.exports = { initModels };
