/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');

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

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }
    let NOW = new Date()
    Query.create({
        id: Math.random().toString(10).slice(3,15),
        type : req.body.type,
        name : req.body.name,
        email : req.body.email,
        category : req.body.category,
        product : req.body.product,
        stage_of_construction : req.body.stage_of_construction,
        state : req.body.state,
        description : req.body.description,
        status : req.body.status,
        status_description : req.body.status_description,
        lang : req.body.lang,
        reference : req.body.reference,
        user_id : req.body.user_id,
        created : NOW,
        updated : NOW
    }).then(function(result) {
        console.log('created queries', result);
        res.jsonp({
            status: 200,
            data: {
                reference_id : `#${result.id}`,
                msg: 'success'
            },
            error: {}
        });
    }).catch(function(err) {
        console.log('Could not create queries record');
        console.log('err: %j', err);
    });

} /*End of createQuery*/


/*Get a single queries */
exports.getQuery = function(req, res) {
    var queries_id = req.params.queries_id;
    console.log('Query Controller: entering getQuery ');
    /*Validate for a null id*/
    if (!queries_id) {
        res.status(400).send("queries ID is null");
        return;
    }
    /* Query DB using sequelize api for a single queries*/
    Query.findOne({
        where: {
            id: queries_id
        }
    }).then(function(queries) {
        console.log(queries);
        res.jsonp({
            status: 200,
            data: {
                "user_id" : 21,     
                "type" : 'ask_expert',     
                "name" : 'Jai',
                "email " : 'jai@gmail.com',            
                "category" : 'Cements',
                "productcode" : "P10001",
                "product_id " : 1,
                "stage_of_construction" : 'Planning',
                "state" : 'Karnataka',
                "city" : 'Bangalore',  
                "pincode" : null,
                "preferred_date" : "21/11/2020", 
                "preferred_time" : '10 AM - 11 AM',    
                "description" : 'Lorem ipsum',
                "status" : 'submitted',
                "status_description" : null,  
                "lang" : "en",
                "slug" : null 
            }
        });
    }).catch(function(err) {
        console.log('could not fetch queries');
        console.log('err: %j', err);
    });
} /*End of getQuery*/

/*Get all Queries */
exports.getAllQueries = function(req, res) {
    console.log('Query Controller: entering getAllQueries');
    /* Query DB using sequelize api for all Queries*/
    Query.findAll().then(function(queries) {
        /*Return an array of Queries */
        res.jsonp({
            status: 200,
            data: [
                {
                    "user_id" : 21,     
                    "type" : 'ask_expert',     
                    "name" : 'Jai',
                    "email " : 'jai@gmail.com',            
                    "category" : 'Cements',
                    "productcode" : "P10001",
                    "product_name": "Prism Duratech Cement",
                    "product_id " : 1,
                    "stage_of_construction" : 'Planning',
                    "state" : 'Karnataka',
                    "city" : 'Bangalore',  
                    "pincode" : null,
                    "preferred_date" : "21/11/2020", 
                    "preferred_time" : '10 AM - 11 AM',    
                    "description" : 'Lorem ipsum',
                    "status" : 'submitted',
                    "status_description" : null,  
                    "lang" : "en",
                    "slug" : null 
                },
                {
                    "user_id" : 22,     
                    "type" : 'ask_expert',     
                    "name" : 'Jai',
                    "email " : 'jai@gmail.com',            
                    "category" : 'Cements',
                    "productcode" : "P10002",
                    "product_id " : 2,
                    "product_name": "Prism Champion Plus",
                    "stage_of_construction" : 'Planning',
                    "state" : 'Karnataka',
                    "city" : 'Bangalore',  
                    "pincode" : null,
                    "preferred_date" : "21/11/2020", 
                    "preferred_time" : '10 AM - 11 AM',    
                    "description" : 'Lorem ipsum',
                    "status" : 'submitted',
                    "status_description" : null,  
                    "lang" : "en",
                    "slug" : null 
                }
            ],
            error: {}
        });
    }).catch(function(err) {
        console.log('could not fetch all queries');
        console.log('err: %j', err);
    });
}; /*End of getAllQueries*/


/*Update queries record.*/
exports.updateQuery = function(req, res) {
    // Log entry.
    console.log('Query Controller: entering updateQuery ');

    var queries_id = req.params.queries_id;
    Query.update({
        id : req.body.id,
				type : req.body.type,
				name : req.body.name,
				email : req.body.email,
				category : req.body.category,
				product : req.body.product,
				stage_of_construction : req.body.stage_of_construction,
				state : req.body.state,
				description : req.body.description,
				status : req.body.status,
				status_description : req.body.status_description,
				lang : req.body.lang,
				reference : req.body.reference,
				user_id : req.body.user_id,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* queries table primary key */
            id: queries_id
        }
    }).then(function(result) {
        console.log('updated queries', result);
        res.send("queries updated successfully");
    }).catch(function(err) {
        console.log('Could not update queries record');
        console.log('err: %j', err);
    });

} /*End of updateQuery*/

/*Delete a single query */
exports.deleteQuery = function(req, res) {
    console.log('Query Controller: entering deleteQuery ');

    var queries_id = req.params.queries_id;
    /*Validate for a null queries_id*/
    if (!queries_id) {
        res.status(400).send("queries ID is null");
        return;
    }
    /* Delete queries record*/
    Query.destroy({
        where: {
            id: queries_id
        }
    }).then(function(query) {
        console.log(query);
        res.jsonp(query);
    }).catch(function(err) {
        console.log('could not delete query');
        console.log('err: %j', err);

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