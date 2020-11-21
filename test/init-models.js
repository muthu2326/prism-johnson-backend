var DataTypes = require("sequelize").DataTypes;
var _banner = require("./banner");
var _city = require("./city");
var _content = require("./content");
var _credentials = require("./credentials");
var _articles = require("./articles");
var _dealer = require("./dealer");
var _orders = require("./orders");
var _quries = require("./quries");
var _session = require("./session");
var _product_mrp_list = require("./product_mrp_list");
var _product = require("./product");
var _sub_description = require("./sub_description");
var _state = require("./state");
var _user = require("./user");
var _testimonial = require("./testimonial");
var _sections = require("./sections");

function initModels(sequelize) {
  var banner = _banner(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);

  return {
    banner,
    city,
    content,
    credentials,
    articles,
    dealer,
    orders,
    quries,
    session,
    product_mrp_list,
    product,
    sub_description,
    state,
    user,
    testimonial,
    sections,
  };
}
module.exports = { initModels };
