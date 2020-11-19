/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
var message = require('../utils/message.json');
/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var ProductMRPModel = require('../models/init-models');
var ProductMRP = ProductMRPModel.initModels(db).product_mrp_list

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create ProductMRP record.*/
exports.createProductMRP = function (req, res) {
    // Log entry.
    console.log('ProductMRP Controller: entering createProductMRP ');
    let slug = slugify(`${uuidv4().slice(4, 12)}`)
    let NOW = new Date()

    ProductMRP.create({
        name: req.body.name,
        lang: req.body.lang,
        slug: slug,
        created: NOW,
        updated: NOW
    }).then(function (result) {
        console.log('created ProductMRP', result);
        res.status(200).jsonp({
            status: 200,
            data: result,
            error: {}
        });
        return;
    }).catch(function (err) {
        console.log('Could not create ProductMRP record');
        console.log('err: %j', err);
    });

} /*End of createProductMRP*/


/*Get a single ProductMRP */
exports.getProductMRP = function (req, res) {
    var ProductMRP_id = req.params.ProductMRP_id;
    console.log('ProductMRP Controller: entering getProductMRP ');
    /*Validate for a null id*/
    if (!ProductMRP_id) {
        res.status(400).send("ProductMRP ID is null");
        return;
    }
    /* Query DB using sequelize api for a single ProductMRP*/
    ProductMRP.findOne({
        where: {
            id: ProductMRP_id
        }
    }).then(function (ProductMRP) {
        console.log(ProductMRP);
        res.jsonp(ProductMRP);
    }).catch(function (err) {
        console.log('could not fetch ProductMRP');
        console.log('err: %j', err);
    });
} /*End of getProductMRP*/

/*Get all ProductMRPs */
exports.getAllProductMRPs = function (req, res) {
    console.log('ProductMRP Controller: entering getAllProductMRPs');
    /* Query DB using sequelize api for all ProductMRPs*/
    ProductMRP.findAll()
    .then(function (ProductMRPs) {
        /*Return an array of ProductMRPs */
        if (ProductMRPs.length > 0) {
            res.status(200).jsonp({
                status: 200,
                data: {
                    count: ProductMRPs.length,
                    prices_list: ProductMRPs
                },
                error: {}
            });
            return;
        } else {
            res.status(400).jsonp({
                status: 400,
                data: [],
                error: {
                    msg: message.no_ProductMRPs_found
                }
            });
            return;
        }
    }).catch(function (err) {
        console.log('could not fetch all ProductMRPs');
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
}; /*End of getAllProductMRPs*/


/*Update ProductMRP record.*/
exports.updateProductMRP = function (req, res) {
    // Log entry.
    console.log('ProductMRP Controller: entering updateProductMRP ');

    var ProductMRP_id = req.params.ProductMRP_id;
    ProductMRP.update({
        id: req.body.id,
        name: req.body.name,
        lang: req.body.lang,
        slug: req.body.slug,
        updated: NOW
    }, {
        where: {
            /* ProductMRP table primary key */
            id: ProductMRP_id
        }
    }).then(function (result) {
        console.log('updated ProductMRP', result);
        res.send("ProductMRP updated successfully");
    }).catch(function (err) {
        console.log('Could not update ProductMRP record');
        console.log('err: %j', err);
    });

} /*End of updateProductMRP*/

/*Delete a single ProductMRP */
exports.deleteProductMRP = function (req, res) {
    console.log('ProductMRP Controller: entering deleteProductMRP ');

    var ProductMRP_id = req.params.ProductMRP_id;
    /*Validate for a null ProductMRP_id*/
    if (!ProductMRP_id) {
        res.status(400).send("ProductMRP ID is null");
        return;
    }
    /* Delete ProductMRP record*/
    ProductMRP.destroy({
        where: {
            id: ProductMRP_id
        }
    }).then(function (ProductMRP) {
        console.log(ProductMRP);
        res.jsonp(ProductMRP);
    }).catch(function (err) {
        console.log('could not delete ProductMRP');
        console.log('err: %j', err);

    });
} /*End of deleteProductMRP*/


/*Get all ProductMRPs for pagination */
exports.getAllProductMRPsForPagination = function (req, res) {
    console.log('ProductMRP Controller: entering getAllProductMRPsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ProductMRPs*/
    ProductMRP.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (ProductMRPs) {
        /*Return an array of ProductMRPs */
        res.jsonp(ProductMRPs);
    }).catch(function (err) {
        console.log('could not fetch all ProductMRPs for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllProductMRPsForPagination*/

/*Get all sorted ProductMRPs  */
exports.getAllProductMRPsSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllProductMRPsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ProductMRPs*/
    ProductMRP.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (ProductMRPs) {
        /*Return an array of ProductMRPs */
        res.jsonp(ProductMRPs);
    }).catch(function (err) {
        console.log('could not fetch all ProductMRPs for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllProductMRPsSortedByColumn*/

/*Get all filtered ProductMRPs */
exports.getAllProductMRPsFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllProductMRPsFilteredByColumn');
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
    ProductMRP.findAll(criteria).then(function (ProductMRPs) {
        /*Return an array of pages */
        res.jsonp(ProductMRPs);
    }).catch(function (err) {
        console.log('could not fetch all ProductMRPs for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllProductMRPsFilteredByColumn*/


/*Get all ProductMRPs by search text */
exports.getAllProductMRPsBySearchText = function (req, res) {
    console.log('ProductMRP Controller: entering getAllProductMRPsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('name'), Sequelize.col('lang'), Sequelize.col('slug'), Sequelize.col('ProductMRP_id'), Sequelize.col('created'), Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all ProductMRPs*/
    ProductMRP.findAll(criteria).then(function (ProductMRPs) {
        /*Return an array of pages */
        res.jsonp(ProductMRPs);
    }).catch(function (err) {
        console.log('could not fetch all ProductMRPs for search');
        console.log('err: %j', err);
    });
}; /*End of getAllProductMRPsBySearchText*/