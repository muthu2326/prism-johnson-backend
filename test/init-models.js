var DataTypes = require("sequelize").DataTypes;
var _banner = require("./banner");
var _content = require("./content");
var _city = require("./city");
var _credentials = require("./credentials");
var _orders = require("./orders");
var _quries = require("./quries");
var _dealer = require("./dealer");
var _sections = require("./sections");
var _product = require("./product");
var _articles = require("./articles");
var _state = require("./state");
var _testimonial = require("./testimonial");
var _product_mrp_list = require("./product_mrp_list");
var _sub_description = require("./sub_description");
var _user = require("./user");

function initModels(sequelize) {
  var banner = _banner(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  return {
    banner,
    content,
    city,
    credentials,
    orders,
    quries,
    dealer,
    sections,
    product,
    articles,
    state,
    testimonial,
    product_mrp_list,
    sub_description,
    user,
  };
}
module.exports = { initModels };
