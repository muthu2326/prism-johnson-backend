var DataTypes = require("sequelize").DataTypes;
var _city = require("./city");
var _articles = require("./articles");
var _banner = require("./banner");
var _content = require("./content");
var _credentials = require("./credentials");
var _orders = require("./orders");
var _product = require("./product");
var _sections = require("./sections");
var _dealer = require("./dealer");
var _sub_description = require("./sub_description");
var _product_mrp_list = require("./product_mrp_list");
var _quries = require("./quries");
var _user = require("./user");
var _session = require("./session");
var _state = require("./state");
var _testimonial = require("./testimonial");

function initModels(sequelize) {
  var city = _city(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);

  return {
    city,
    articles,
    banner,
    content,
    credentials,
    orders,
    product,
    sections,
    dealer,
    sub_description,
    product_mrp_list,
    quries,
    user,
    session,
    state,
    testimonial,
  };
}
module.exports = { initModels };
