/*Beans Copyright info*/

var Sequelize = require('sequelize');
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

var QueryModel = require('../models/init-models');
var Query = QueryModel.initModels(db).quries;

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create queries record.*/
exports.createQuery = function(req, res) {
    // Log entry.
    console.log('Query Controller: entering createQuery ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    if(!req.body.email || !req.body.name){
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.missing_fields
            }
        });
        return;
    }

    let NOW = new Date()

    findUser(req.body.user_id, 'user', function(err, response) {
        if(err){
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.no_users_found
                }
            });
            return;
        }else if(response){
            let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.email.slice(0,5)}`)
            Query.create({
                id: Math.random().toString(10).slice(3,15),
                type : req.body.type,
                name : req.body.name,
                email : req.body.email,
                category : req.body.category,
                productcode : req.body.productcode,
                // product_id: req.body.product_id,
                product_name: req.body.product_name,
                mobile: req.body.mobile,
                city: req.body.city,
                stage_of_construction : req.body.stage_of_construction,
                preferred_date: new Date(req.body.preferred_date),
                preferred_time: req.body.preferred_time,
                state : req.body.state,
                description : req.body.description,
                status : req.body.status,
                status_description : req.body.status_description,
                lang : req.body.lang ? req.body.lang : 'en',
                slug : slug,
                user_id : req.body.user_id,
                created : NOW,
                updated : NOW
            }).then(function(result) {
                console.log('created queries', result);
                res.jsonp({
                    status: 200,
                    data: {
                        id : `#${result.id}`,
                        msg: 'success'
                    },
                    error: {}
                });
            }).catch(function(err) {
                console.log('Could not create queries record');
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
        }
    })

} /*End of createQuery*/


/*Get a single queries */
exports.getQuery = function(req, res) {
    console.log('Query Controller: entering getQuery ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    var queries_id = req.params.queries_id;

    /*Validate for a null id*/
    if (!queries_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    if (!req.query.type) {
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
    let type = req.query.type ? req.query.type : 'ask_expert'

    /* Query DB using sequelize api for a single queries*/
    Query.findOne({
        where: {
            id: queries_id,
            lang: lang,
            type: type
        }
    }).then(function(queries) {
        console.log(queries);
        res.status(200).jsonp({
            status: 200,
            data: queries,
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('could not fetch queries');
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
} /*End of getQuery*/

/*Get all Queries */
exports.getAllQueries = function(req, res) {
    console.log('Query Controller: entering getAllQueries');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let lang = req.query.lang ? req.query.lang : 'en'
    console.log('lang', lang)

    /* Query DB using sequelize api for all Queries*/
    Query.findAll({
        where: {
            lang: lang
        }
    }).then(function(queries) {
        /*Return an array of Queries */
        if(queries.length > 0){
            res.status(200).jsonp({
                status: 200,
                data: queries,
                error: {}
            });
        }else{
            res.status(400).jsonp({
                status: 400,
                data: [],
                error: {
                    msg: message.no_queries_found
                }
            });
        }
    }).catch(function(err) {
        console.log('could not fetch all queries');
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
}; /*End of getAllQueries*/


/*Update queries record.*/
exports.updateQuery = function(req, res) {
    // Log entry.
    console.log('Query Controller: entering updateQuery ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    console.log('req body :: ', req.body)

    var queries_id = req.params.queries_id;
    let lang = req.query.lang ? req.query.lang : 'en'
    let NOW = new Date()

    if (!queries_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    Query.update({
        type : req.body.type,
        name : req.body.name,
        email : req.body.email,
        category : req.body.category,
        productcode : req.body.productcode,
        product_name: req.body.product_name,
        product_id: req.body.product_id,
        mobile: req.body.mobile,
        stage_of_construction : req.body.stage_of_construction,
        preferred_date: req.body.preferred_date,
        preferred_time: req.body.preferred_time,
        state : req.body.state,
        description : req.body.description,
        status : req.body.status,
        status_description : req.body.status_description,
        user_id : req.body.user_id,
        updated : NOW
    }, {
        where: {
            /* queries table primary key */
            id: queries_id,
            lang: lang
        }
    }).then(function(result) {
        console.log('updated queries', result);
        res.status(200).jsonp({
            status: 200,
            data: {
                msg: `${message.updated_query} ${req.params.queries_id}`
            },
            error: {}
        });
    }).catch(function(err) {
        console.log('Could not update queries record');
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

} /*End of updateQuery*/

/*Delete a single query */
exports.deleteQuery = function(req, res) {
    console.log('Query Controller: entering deleteQuery ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    var queries_id = req.params.queries_id;
    let lang = req.query.lang ? req.query.lang : 'en'

    /*Validate for a null queries_id*/
    if (!queries_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    /* Delete queries record*/
    Query.destroy({
        where: {
            id: queries_id,
            lang: lang
        }
    }).then(function(query) {
        console.log(query);
        res.status(200).jsonp({
            status: 200,
            data: {
                msg: `${message.removed_query} ${req.params.queries_id}`
            },
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('could not delete query');
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
} /*End of deleteQuery*/


/*Get all Queries for pagination */
exports.getAllQueriesForPagination = function(req, res) {
    console.log('Query Controller: entering getAllQueriesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Queries*/
    Query.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(queries) {
        /*Return an array of queries */
        res.jsonp(queries);
    }).catch(function(err) {
        console.log('could not fetch all queries for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllQueriesForPagination*/

/*Get all sorted Queries  */
exports.getAllQueriesSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllQueriesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Queries*/
    Query.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(queries) {
        /*Return an array of Queries */
        res.jsonp(queries);
    }).catch(function(err) {
        console.log('could not fetch all Queries for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllQueriesSortedByColumn*/

/*Get all filtered Queries */
exports.getAllQueriesFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllQueriesFilteredByColumn');
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
    Query.findAll(criteria).then(function(queries) {
        /*Return an array of pages */
        res.jsonp(queries);
    }).catch(function(err) {
        console.log('could not fetch all Queries for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllQueriesFilteredByColumn*/


/*Get all Queries by search text */
exports.getAllQueriesBySearchText = function(req, res) {
    console.log('Query Controller: entering getAllQueriesBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('type'),Sequelize.col('name'),Sequelize.col('email'),Sequelize.col('category'),Sequelize.col('product'),Sequelize.col('stage_of_construction'),Sequelize.col('state'),Sequelize.col('description'),Sequelize.col('status'),Sequelize.col('status_description'),Sequelize.col('lang'),Sequelize.col('reference'),Sequelize.col('user_id'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all queries*/
    Query.findAll(criteria).then(function(queries) {
        /*Return an array of pages */
        res.jsonp(queries);
    }).catch(function(err) {
        console.log('could not fetch all queries for search');
        console.log('err: %j', err);
    });
}; /*End of getAllQueriesBySearchText*/