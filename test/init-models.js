var DataTypes = require("sequelize").DataTypes;
var _articles = require("./articles");
var _content = require("./content");
var _city = require("./city");
var _banner = require("./banner");
var _orders = require("./orders");
var _product = require("./product");
var _product_mrp_list = require("./product_mrp_list");
var _quries = require("./quries");
var _sections = require("./sections");
var _credentials = require("./credentials");
var _dealer = require("./dealer");
var _testimonial = require("./testimonial");
var _state = require("./state");
var _session = require("./session");
var _user = require("./user");
var _sub_description = require("./sub_description");

function initModels(sequelize) {
  var articles = _articles(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);

  return {
    articles,
    content,
    city,
    banner,
    orders,
    product,
    product_mrp_list,
    quries,
    sections,
    credentials,
    dealer,
    testimonial,
    state,
    session,
    user,
    sub_description,
  };
}
module.exports = { initModels };
