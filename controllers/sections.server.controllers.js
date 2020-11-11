/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var SectionModel = require('../models/init-models');
var Section = SectionModel.initModels(db.getDbConnection())

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create sections record.*/
exports.createSection = function(req, res) {
    // Log entry.
    console.log('Section Controller: entering createSection ');
    Section.create({
        id : req.body.id,
				type : req.body.type,
				article_id : req.body.article_id,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				sub_title : req.body.sub_title,
				sub_description : req.body.sub_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : req.body.created,
				updated : req.body.updated
    }).then(function(result) {
        console.log('created sections', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create sections record');
        console.log('err: %j', err);
    });

} /*End of createSection*/


/*Get a single sections */
exports.getSection = function(req, res) {
    var sections_id = req.params.sections_id;
    console.log('Section Controller: entering getSection ');
    /*Validate for a null id*/
    if (!sections_id) {
        res.status(400).send("sections ID is null");
        return;
    }
    /* Query DB using sequelize api for a single sections*/
    Section.findOne({
        where: {
            id: sections_id
        }
    }).then(function(sections) {
        console.log(sections);
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch sections');
        console.log('err: %j', err);
    });
} /*End of getSection*/

/*Get all Sections */
exports.getAllSections = function(req, res) {
    console.log('Section Controller: entering getAllSections');
    /* Query DB using sequelize api for all Sections*/
    Section.findAll().then(function(sections) {
        /*Return an array of Sections */
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch all sections');
        console.log('err: %j', err);
    });
}; /*End of getAllSections*/


/*Update sections record.*/
exports.updateSection = function(req, res) {
    // Log entry.
    console.log('Section Controller: entering updateSection ');

    var sections_id = req.params.sections_id;
    Section.update({
        id : req.body.id,
				type : req.body.type,
				article_id : req.body.article_id,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				sub_title : req.body.sub_title,
				sub_description : req.body.sub_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* sections table primary key */
            id: sections_id
        }
    }).then(function(result) {
        console.log('updated sections', result);
        res.send("sections updated successfully");
    }).catch(function(err) {
        console.log('Could not update sections record');
        console.log('err: %j', err);
    });

} /*End of updateSection*/

/*Delete a single section */
exports.deleteSection = function(req, res) {
    console.log('Section Controller: entering deleteSection ');

    var sections_id = req.params.sections_id;
    /*Validate for a null sections_id*/
    if (!sections_id) {
        res.status(400).send("sections ID is null");
        return;
    }
    /* Delete sections record*/
    Section.destroy({
        where: {
            id: sections_id
        }
    }).then(function(section) {
        console.log(section);
        res.jsonp(section);
    }).catch(function(err) {
        console.log('could not delete section');
        console.log('err: %j', err);

    });
} /*End of deleteSection*/


/*Get all Sections for pagination */
exports.getAllSectionsForPagination = function(req, res) {
    console.log('Section Controller: entering getAllSectionsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Sections*/
    Section.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(sections) {
        /*Return an array of sections */
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch all sections for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllSectionsForPagination*/

/*Get all sorted Sections  */
exports.getAllSectionsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllSectionsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Sections*/
    Section.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(sections) {
        /*Return an array of Sections */
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch all Sections for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllSectionsSortedByColumn*/

/*Get all filtered Sections */
exports.getAllSectionsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllSectionsFilteredByColumn');
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
    Section.findAll(criteria).then(function(sections) {
        /*Return an array of pages */
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch all Sections for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllSectionsFilteredByColumn*/


/*Get all Sections by search text */
exports.getAllSectionsBySearchText = function(req, res) {
    console.log('Section Controller: entering getAllSectionsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('type'),Sequelize.col('article_id'),Sequelize.col('media_type'),Sequelize.col('media_url'),Sequelize.col('sub_title'),Sequelize.col('sub_description'),Sequelize.col('description'),Sequelize.col('lang'),Sequelize.col('slug'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all sections*/
    Section.findAll(criteria).then(function(sections) {
        /*Return an array of pages */
        res.jsonp(sections);
    }).catch(function(err) {
        console.log('could not fetch all sections for search');
        console.log('err: %j', err);
    });
}; /*End of getAllSectionsBySearchText*/