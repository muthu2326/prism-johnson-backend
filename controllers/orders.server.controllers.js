/*Beans Copyright info*/

var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../db/connection/db');
var { findUser } = require('../utils/db_helper')
var message = require('../utils/message.json');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */
console.log('db')
var OrderModel = require('../models/init-models');
var Order = OrderModel.initModels(db).orders

var DealerModel = require('../models/init-models');
var Dealer = DealerModel.initModels(db).dealer

Dealer.belongsTo(Order, {foreignKey: 'dealer_id'});
/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create Order record.*/
exports.createOrder = function (req, res) {
    // Log entry.
    console.log('Order Controller: entering createOrder ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    let NOW = new Date()

    findUser(req.body.user_id, 'user', function(err, response) {
        if(err){
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.invalid_user
                }
            });
            return;
        }else if(response){

            let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.email.slice(0,5)}`)
            Order.create({
                id: Math.random().toString(10).slice(3,15),
                product_id: req.body.product_id,
                productcode: req.body.productcode,
                dealer_id: req.body.dealer_id,
                user_id: req.body.user_id,
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                quantity: req.body.quantity,
                price: req.body.price,
                stage_of_construction: req.body.stage_of_construction,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                address: req.body.address,
                site_address: req.body.site_address,
                status: req.body.status,
                status_description: req.body.status_description,
                lang: req.body.lang ? req.body.lang : 'en',
                slug: slug,
                created: NOW,
                updated: NOW,
                updated_by: req.body.updated_by,
                updated_by_role: req.body.updated_by_role
            }).then(function (result) {
                console.log('created Order', result);
                res.jsonp({
                    status: 200,
                    data: {
                        id : `#${result.id}`,
                        msg: 'success'
                    },
                    error: {}
                });
            }).catch(function (err) {
                console.log('Could not create Order record');
                console.log('err: %j', err);
                res.jsonp({
                    status: 500,
                    data: {},
                    error: {
                        msg : message.something_went_wrong,
                        err: err
                    }
                });
                return;
            });
        }else{
            res.jsonp({
                status: 400,
                data: {},
                error: {
                    msg : message.invalid_user,
                }
            });
            return;
        }
    })
} /*End of createOrder*/


/*Get a single Order */
exports.getOrder = function (req, res) {
    var order_id = req.params.order_id;
    console.log('Order Controller: entering getOrder ');
    /*Validate for a null id*/
    if (!order_id) {
        res.status(400).send("Order ID is null");
        return;
    }
    /* Query DB using sequelize api for a single Order*/
    Order.findOne({
        where: {
            id: order_id
        }
    }).then(function (order) {
        console.log(order);
        res.status(200).jsonp({
            status: 200,
            data: order,
            error: {}
        });
        return;
    }).catch(function (err) {
        console.log('could not fetch Order');
        console.log('err: %j', err);
        res.jsonp({
            status: 500,
            data: {},
            error: {
                msg : message.something_went_wrong,
                err: err
            }
        });
    });
} /*End of getOrder*/

/*Get all Orders */
exports.getAllOrders = function (req, res) {
    console.log('Order Controller: entering getAllOrders');
    /* Query DB using sequelize api for all Orders*/

    let dealer_id = req.query.dealer
    let lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';
    let cities = req.query.cities
    let where_condition;

    console.log('cities', cities)
    if(dealer_id){
        where_condition = {
            dealer_id: dealer_id,
            lang: lang
        }
    }else if(cities){
        where_condition = {
            city: {
                [Op.in]: cities
            },
            lang: lang
        }
    }else{
        where_condition = {
            lang: lang
        }
    }

    console.log('where_condition', where_condition)

    Order.findAll({
        where: where_condition
    }).then(function (orders) {
        /*Return an array of Orders */
        if(orders.length > 0){
            res.status(200).jsonp({
                status: 200,
                data: orders,
                error: {}
            });
        }else{
            res.status(400).jsonp({
                status: 400,
                data: [],
                error: {
                    msg: message.no_orders_found
                }
            });
        }
    }).catch(function (err) {
        console.log('could not fetch all Orders');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong,
                err: err
            }
        });
        return;
    });
}; /*End of getAllOrders*/


/*Update Order record.*/
exports.updateOrder = function (req, res) {
    // Log entry.
    console.log('Order Controller: entering updateOrder ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    let NOW = new Date()

    var order_id = req.params.order_id;
    Order.update({
        product_id : req.body.product_id,
        productcode : req.body.productcode,
        dealer_id : req.body.dealer_id,
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile,
        quantity : req.body.quantity,
        price : req.body.price,
        stage_of_construction : req.body.stage_of_construction,
        state : req.body.state,
        city : req.body.city,
        pincode : req.body.pincode,
        address : req.body.address,
        site_address : req.body.site_address,
        status : req.body.status,
        status_description : req.body.status_description,
        updated : NOW,
        updated_by : req.body.updated_by,
        updated_by_role : req.body.updated_by_role
    }, {
        where: {
            /* Order table primary key */
            id: order_id
        }
    }).then(function (result) {
        console.log('updated Order', result);
        res.status(200).jsonp({
            status: 200,
            data: {
                msg: `${message.updated_order} ${req.params.order_id}`
            },
            error: {}
        });
    }).catch(function (err) {
        console.log('Could not update Order record');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong,
                err: err
            }
        });
        return;
    });

} /*End of updateOrder*/

/*Delete a single Order */
exports.deleteOrder = function (req, res) {
    console.log('Order Controller: entering deleteOrder ');

    var order_id = req.params.order_id;
    /*Validate for a null order_id*/
    if (!order_id) {
        res.status(400).send("Order ID is null");
        return;
    }
    /* Delete Order record*/
    Order.destroy({
        where: {
            id: order_id
        }
    }).then(function (Order) {
        console.log(Order);
        res.jsonp(Order);
    }).catch(function (err) {
        console.log('could not delete Order');
        console.log('err: %j', err);

    });
} /*End of deleteOrder*/


/*Get all Orders for pagination */
exports.getAllOrdersForPagination = function (req, res) {
    console.log('Order Controller: entering getAllOrdersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Orders*/
    Order.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (orders) {
        /*Return an array of Orders */
        res.jsonp(orders);
    }).catch(function (err) {
        console.log('could not fetch all Orders for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllOrdersForPagination*/

/*Get all sorted Orders  */
exports.getAllOrdersSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllOrdersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Orders*/
    Order.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (orders) {
        /*Return an array of Orders */
        res.jsonp(orders);
    }).catch(function (err) {
        console.log('could not fetch all Orders for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllOrdersSortedByColumn*/

/*Get all filtered Orders */
exports.getAllOrdersFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllOrdersFilteredByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var filterText = req.params.filterText;
    var offset = itemsPerPage * (pageNo - 1);
    var criteria = {};
    var whereCl = {};
    whereCl[colname] = filterText;

    criteria['where'] = whereCl;

    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
    Order.findAll(criteria).then(function (orders) {
        /*Return an array of pages */
        res.jsonp(orders);
    }).catch(function (err) {
        console.log('could not fetch all Orders for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllOrdersFilteredByColumn*/


/*Get all Orders by search text */
exports.getAllOrdersBySearchText = function (req, res) {
    console.log('Order Controller: entering getAllOrdersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('Ordercode'), Sequelize.col('media_type'), Sequelize.col('media_url'), Sequelize.col('title'), Sequelize.col('short_description'), Sequelize.col('description'), Sequelize.col('lang'), Sequelize.col('slug'), Sequelize.col('created'), Sequelize.col('updated'), Sequelize.col('created_by'), Sequelize.col('updated_by'), Sequelize.col('pincode'), Sequelize.col('csv_file_name'), Sequelize.col('features')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all Orders*/
    Order.findAll(criteria).then(function (orders) {
        /*Return an array of pages */
        res.jsonp(orders);
    }).catch(function (err) {
        console.log('could not fetch all Orders for search');
        console.log('err: %j', err);
    });
}; /*End of getAllOrdersBySearchText*/