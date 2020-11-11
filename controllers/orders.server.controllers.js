/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var OrderModel = require('../models/init-models');
var Order = OrderModel.initModels(db).orders

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create Order record.*/
exports.createOrder = function (req, res) {
    // Log entry.
    console.log('Order Controller: entering createOrder ');

    Order.create({
        id: req.body.id,
        product_id: req.body.product_id,
        productcode: req.body.productcode,
        dealer_id: req.body.dealer_id,
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
        lang: req.body.lang,
        slug: req.body.slug,
        created: req.body.created,
        updated: req.body.updated,
        updated_by: req.body.updated_by,
        updated_by_role: req.body.updated_by_role
    }).then(function (result) {
        console.log('created Order', result);
        res.jsonp(result);
    }).catch(function (err) {
        console.log('Could not create Order record');
        console.log('err: %j', err);
    });

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
        res.jsonp(order);
    }).catch(function (err) {
        console.log('could not fetch Order');
        console.log('err: %j', err);
    });
} /*End of getOrder*/

/*Get all Orders */
exports.getAllOrders = function (req, res) {
    console.log('Order Controller: entering getAllOrders');
    /* Query DB using sequelize api for all Orders*/
    Order.findAll().then(function (orders) {
        /*Return an array of Orders */
        res.jsonp(orders);
    }).catch(function (err) {
        console.log('could not fetch all Orders');
        console.log('err: %j', err);
    });
}; /*End of getAllOrders*/


/*Update Order record.*/
exports.updateOrder = function (req, res) {
    // Log entry.
    console.log('Order Controller: entering updateOrder ');

    var order_id = req.params.order_id;
    Order.update({
        id: req.body.id,
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
        lang : req.body.lang,
        slug : req.body.slug,
        created : req.body.created,
        updated : req.body.updated,
        updated_by : req.body.updated_by,
        updated_by_role : req.body.updated_by_role
    }, {
        where: {
            /* Order table primary key */
            id: order_id
        }
    }).then(function (result) {
        console.log('updated Order', result);
        res.send("Order updated successfully");
    }).catch(function (err) {
        console.log('Could not update Order record');
        console.log('err: %j', err);
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