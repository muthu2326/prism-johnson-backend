/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
var message = require('../utils/message.json');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var ProductModel = require('../models/init-models');
var Product = ProductModel.initModels(db).product

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create product record.*/
exports.createProduct = function(req, res) {
    // Log entry.
    console.log('Product Controller: entering createProduct ');
    console.log('Order Controller: entering createOrder ');
    console.log('Query Controller: entering createQuery ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let productcode;
    if(req.body.slug == null || req.body.slug == ''){
        productcode = `PC${Math.random().toString(10).slice(3,10)}`
    }else{
        productcode = req.body.productcode
    }
    let slug = slugify(`${uuidv4().slice(4, 12)} ${productcode}`)

    console.log('product-code', productcode)

    Product.create({
        id : req.body.id,
        productcode : productcode,
        media_type : req.body.media_type,
        media_url : req.body.media_url,
        title : req.body.title,
        short_description : req.body.short_description,
        description : req.body.description,
        lang : req.body.lang,
        slug : req.body.slug ? req.body.slug : slug,
        created : req.body.created,
        updated : req.body.updated,
        created_by : req.body.created_by,
        updated_by : req.body.updated_by,
        pincode : req.body.pincode,
        csv_file_name : req.body.csv_file_name,
        features : req.body.features
    }).then(function(result) {
        console.log('created product', result);
        res.jsonp({
            status: 200,
            data: result,
            error: {}
        });
    }).catch(function(err) {
        console.log('Could not create product record');
        console.log('err: %j', err);
    });

} /*End of createProduct*/


/*Get a single product */
exports.getProduct = function(req, res) {
    // var product_id = req.params.product_id;
    console.log('Product Controller: entering getProduct ');
    /*Validate for a null id*/

    if (!req.params.slug) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let lang = req.query.lang ? req.query.lang : 'en'
    let slug = req.params.slug
    /* Query DB using sequelize api for a single product*/
    Product.findOne({
        where: {
            slug: slug,
            lang: lang
        }
    }).then(function(product) {
        console.log(product);
        res.status(200).jsonp({
            status: 200,
            data: product,
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('could not fetch product');
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
} /*End of getProduct*/

/*Get all Products */
exports.getAllProducts = function(req, res) {
    console.log('Product Controller: entering getAllProducts');
    /* Query DB using sequelize api for all Products*/
    console.log('Query Controller: entering getAllQueries');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let lang = req.query.lang ? req.query.lang : 'en'
    console.log('lang', lang)
    
    Product.findAll({
        where: {
            lang: lang
        },
        order: [
            ['created', 'DESC']
        ]
    }).then(function(products) {
        /*Return an array of Products */
        if(products.length > 0){
            res.status(200).jsonp({
                status: 200,
                data: products,
                error: {}
            });
        }else{
            res.status(400).jsonp({
                status: 400,
                data: [],
                error: {
                    msg: message.no_products_found
                }
            });
        }
    }).catch(function(err) {
        console.log('could not fetch all products');
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
}; /*End of getAllProducts*/


/*Update product record.*/
exports.updateProduct = function(req, res) {
    // Log entry.
    console.log('Product Controller: entering updateProduct ');

    var product_id = req.params.product_id;
    Product.update({
        id : req.body.id,
				productcode : req.body.productcode,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				title : req.body.title,
				short_description : req.body.short_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : req.body.created,
				updated : req.body.updated,
				created_by : req.body.created_by,
				updated_by : req.body.updated_by,
				pincode : req.body.pincode,
				csv_file_name : req.body.csv_file_name,
				features : req.body.features
    }, {
        where: {
            /* product table primary key */
            id: product_id
        }
    }).then(function(result) {
        console.log('updated product', result);
        res.send("product updated successfully");
    }).catch(function(err) {
        console.log('Could not update product record');
        console.log('err: %j', err);
    });

} /*End of updateProduct*/

/*Delete a single product */
exports.deleteProduct = function(req, res) {
    console.log('Product Controller: entering deleteProduct ');

    var product_id = req.params.product_id;
    /*Validate for a null product_id*/
    if (!product_id) {
        res.status(400).send("product ID is null");
        return;
    }
    /* Delete product record*/
    Product.destroy({
        where: {
            id: product_id
        }
    }).then(function(product) {
        console.log(product);
        res.jsonp(product);
    }).catch(function(err) {
        console.log('could not delete product');
        console.log('err: %j', err);

    });
} /*End of deleteProduct*/


/*Get all Products for pagination */
exports.getAllProductsForPagination = function(req, res) {
    console.log('Product Controller: entering getAllProductsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Products*/
    Product.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(products) {
        /*Return an array of products */
        res.jsonp(products);
    }).catch(function(err) {
        console.log('could not fetch all products for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsForPagination*/

/*Get all sorted Products  */
exports.getAllProductsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllProductsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Products*/
    Product.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(products) {
        /*Return an array of Products */
        res.jsonp(products);
    }).catch(function(err) {
        console.log('could not fetch all Products for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsSortedByColumn*/

/*Get all filtered Products */
exports.getAllProductsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllProductsFilteredByColumn');
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
    Product.findAll(criteria).then(function(products) {
        /*Return an array of pages */
        res.jsonp(products);
    }).catch(function(err) {
        console.log('could not fetch all Products for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsFilteredByColumn*/


/*Get all Products by search text */
exports.getAllProductsBySearchText = function(req, res) {
    console.log('Product Controller: entering getAllProductsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('productcode'),Sequelize.col('media_type'),Sequelize.col('media_url'),Sequelize.col('title'),Sequelize.col('short_description'),Sequelize.col('description'),Sequelize.col('lang'),Sequelize.col('slug'),Sequelize.col('created'),Sequelize.col('updated'),Sequelize.col('created_by'),Sequelize.col('updated_by'),Sequelize.col('pincode'),Sequelize.col('csv_file_name'),Sequelize.col('features')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all products*/
    Product.findAll(criteria).then(function(products) {
        /*Return an array of pages */
        res.jsonp(products);
    }).catch(function(err) {
        console.log('could not fetch all products for search');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsBySearchText*/