/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/db');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

// var DescriptionListModel = require('../models/init-models');
// var DescriptionList = DescriptionListModel.initModels(db.getDbConnection())

var db1 = require('../models');
var DescriptionList = db1.sub_description

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create description_list record.*/
exports.createDescriptionList = function(req, res) {
    // Log entry.
    console.log('DescriptionList Controller: entering createDescriptionList ');

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }

    DescriptionList.create({
        id : req.body.id,
				value : req.body.value,
				lang : req.body.lang,
				content_id : req.body.content_id,
				reference : req.body.reference,
				created : req.body.created,
				updated : req.body.updated
    }).then(function(result) {
        console.log('created description_list', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create description_list record');
        console.log('err: %j', err);
    });

} /*End of createDescriptionList*/


/*Get a single description_list */
exports.getDescriptionList = function(req, res) {
    var description_list_id = req.params.description_list_id;
    console.log('DescriptionList Controller: entering getDescriptionList ');
    /*Validate for a null id*/
    if (!description_list_id) {
        res.status(400).send("description_list ID is null");
        return;
    }
    /* Query DB using sequelize api for a single description_list*/
    DescriptionList.findOne({
        where: {
            id: description_list_id
        }
    }).then(function(description_list) {
        console.log(description_list);
        res.jsonp(description_list);
    }).catch(function(err) {
        console.log('could not fetch description_list');
        console.log('err: %j', err);
    });
} /*End of getDescriptionList*/

/*Get all DescriptionLists */
exports.getAllDescriptionLists = function(req, res) {
    console.log('DescriptionList Controller: entering getAllDescriptionLists');
    /* Query DB using sequelize api for all DescriptionLists*/
    DescriptionList.findAll().then(function(descriptionLists) {
        /*Return an array of DescriptionLists */
        res.jsonp(descriptionLists);
    }).catch(function(err) {
        console.log('could not fetch all descriptionLists');
        console.log('err: %j', err);
    });
}; /*End of getAllDescriptionLists*/


/*Update description_list record.*/
exports.updateDescriptionList = function(req, res) {
    // Log entry.
    console.log('DescriptionList Controller: entering updateDescriptionList ');

    var description_list_id = req.params.description_list_id;
    DescriptionList.update({
        id : req.body.id,
				value : req.body.value,
				lang : req.body.lang,
				content_id : req.body.content_id,
				reference : req.body.reference,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* description_list table primary key */
            id: description_list_id
        }
    }).then(function(result) {
        console.log('updated description_list', result);
        res.send("description_list updated successfully");
    }).catch(function(err) {
        console.log('Could not update description_list record');
        console.log('err: %j', err);
    });

} /*End of updateDescriptionList*/

/*Delete a single descriptionList */
exports.deleteDescriptionList = function(req, res) {
    console.log('DescriptionList Controller: entering deleteDescriptionList ');

    var description_list_id = req.params.description_list_id;
    /*Validate for a null description_list_id*/
    if (!description_list_id) {
        res.status(400).send("description_list ID is null");
        return;
    }
    /* Delete description_list record*/
    DescriptionList.destroy({
        where: {
            id: description_list_id
        }
    }).then(function(descriptionList) {
        console.log(descriptionList);
        res.jsonp(descriptionList);
    }).catch(function(err) {
        console.log('could not delete descriptionList');
        console.log('err: %j', err);

    });
} /*End of deleteDescriptionList*/


/*Get all DescriptionLists for pagination */
exports.getAllDescriptionListsForPagination = function(req, res) {
    console.log('DescriptionList Controller: entering getAllDescriptionListsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all DescriptionLists*/
    DescriptionList.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(descriptionLists) {
        /*Return an array of descriptionLists */
        res.jsonp(descriptionLists);
    }).catch(function(err) {
        console.log('could not fetch all descriptionLists for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllDescriptionListsForPagination*/

/*Get all sorted DescriptionLists  */
exports.getAllDescriptionListsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllDescriptionListsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all DescriptionLists*/
    DescriptionList.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(descriptionLists) {
        /*Return an array of DescriptionLists */
        res.jsonp(descriptionLists);
    }).catch(function(err) {
        console.log('could not fetch all DescriptionLists for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllDescriptionListsSortedByColumn*/

/*Get all filtered DescriptionLists */
exports.getAllDescriptionListsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllDescriptionListsFilteredByColumn');
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
    DescriptionList.findAll(criteria).then(function(descriptionLists) {
        /*Return an array of pages */
        res.jsonp(descriptionLists);
    }).catch(function(err) {
        console.log('could not fetch all DescriptionLists for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllDescriptionListsFilteredByColumn*/


/*Get all DescriptionLists by search text */
exports.getAllDescriptionListsBySearchText = function(req, res) {
    console.log('DescriptionList Controller: entering getAllDescriptionListsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('value'),Sequelize.col('lang'),Sequelize.col('content_id'),Sequelize.col('reference'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all descriptionLists*/
    DescriptionList.findAll(criteria).then(function(descriptionLists) {
        /*Return an array of pages */
        res.jsonp(descriptionLists);
    }).catch(function(err) {
        console.log('could not fetch all descriptionLists for search');
        console.log('err: %j', err);
    });
}; /*End of getAllDescriptionListsBySearchText*/