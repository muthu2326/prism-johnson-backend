var DataTypes = require("sequelize").DataTypes;
var _content = require("./content");
var _credentials = require("./credentials");
var _banner = require("./banner");
var _city = require("./city");
var _articles = require("./articles");
var _product_mrp_list = require("./product_mrp_list");
var _orders = require("./orders");
var _sections = require("./sections");
var _product = require("./product");
var _state = require("./state");
var _quries = require("./quries");
var _dealer = require("./dealer");
var _session = require("./session");
var _sub_description = require("./sub_description");
var _user = require("./user");
var _testimonial = require("./testimonial");

function initModels(sequelize) {
  var content = _content(sequelize, DataTypes);
  var credentials = _credentials(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var articles = _articles(sequelize, DataTypes);
  var product_mrp_list = _product_mrp_list(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var sections = _sections(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var quries = _quries(sequelize, DataTypes);
  var dealer = _dealer(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var sub_description = _sub_description(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var testimonial = _testimonial(sequelize, DataTypes);

  return {
    content,
    credentials,
    banner,
    city,
    articles,
    product_mrp_list,
    orders,
    sections,
    product,
    state,
    quries,
    dealer,
    session,
    sub_description,
    user,
    testimonial,
  };
}
module.exports = { initModels };
