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

var ContentModel = require('../models/init-models');
var Content = ContentModel.initModels(db).content

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create content record.*/
exports.createContent = function (req, res) {
    // Log entry.
    console.log('Content Controller: entering createContent ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    let slug = slugify(`${uuidv4().slice(4, 12)}`)
    let lang = req.query.lang ? req.query.lang : 'en'

    let NOW = new Date()
    Content.create({
        title: req.body.title,
        type: req.body.type,
        media_type: req.body.media_type,
        media_url: req.body.media_url,
        griha_nirman_description: req.body.griha_nirman_description,
        contact_address: req.body.contact_address,
        contact_email: req.body.contact_email,
        contact_toll_free_number: req.body.contact_toll_free_number,
        lang: lang,
        slug: slug,
        created: NOW,
        updated: NOW,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by
    }).then(function (result) {
        console.log('created content', result);
        res.jsonp({
            status: 200,
            data: result,
            error: {}
        });
    }).catch(function (err) {
        console.log('Could not create content record');
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

} /*End of createContent*/


/*Get a single content */
exports.getContent = function (req, res) {
    var slug = req.params.slug;
    console.log('Content Controller: entering getContent ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    /*Validate for a null id*/
    if (!slug) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }
    /* Query DB using sequelize api for a single content*/
    Content.findOne({
        where: {
            slug: slug,
            lang: lang
        }
    }).then(function (content) {
        console.log(content);
        res.status(200).jsonp({
            status: 200,
            data: content,
            error: {}
        });
        return
    }).catch(function (err) {
        console.log('could not fetch content');
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
} /*End of getContent*/

/*Get all Contents */
exports.getAllContents = function (req, res) {
    console.log('Content Controller: entering getAllContents');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let lang = req.query.lang ? req.query.lang : 'en'
    /* Query DB using sequelize api for all Contents*/
    Content.findAll({
        where: {
            lang: lang
        }
    }).then(function (contents) {
        /*Return an array of Contents */
        res.status(200).jsonp({
            status: 200,
            data: contents,
            error: {}
        });
    }).catch(function (err) {
        console.log('could not fetch all contents');
        console.log('err:', err);
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
}; /*End of getAllContents*/


/*Update content record.*/
exports.updateContent = function (req, res) {
    // Log entry.
    console.log('Content Controller: entering updateContent ');

    var content_id = req.params.content_id;
    Content.update({
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        media_type: req.body.media_type,
        media_url: req.body.media_url,
        griha_nirman_description: req.body.griha_nirman_description,
        contact_address: req.body.contact_address,
        contact_email: req.body.contact_email,
        contact_toll_free_number: req.body.contact_toll_free_number,
        lang: req.body.lang,
        slug: req.body.slug,
        created: req.body.created,
        updated: req.body.updated,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by
    }, {
        where: {
            /* content table primary key */
            id: content_id
        }
    }).then(function (result) {
        console.log('updated content', result);
        res.send("content updated successfully");
    }).catch(function (err) {
        console.log('Could not update content record');
        console.log('err: %j', err);
    });

} /*End of updateContent*/

/*Delete a single content */
exports.deleteContent = function (req, res) {
    console.log('Content Controller: entering deleteContent ');

    var content_id = req.params.content_id;
    /*Validate for a null content_id*/
    if (!content_id) {
        res.status(400).send("content ID is null");
        return;
    }
    /* Delete content record*/
    Content.destroy({
        where: {
            id: content_id
        }
    }).then(function (content) {
        console.log(content);
        res.jsonp(content);
    }).catch(function (err) {
        console.log('could not delete content');
        console.log('err: %j', err);

    });
} /*End of deleteContent*/


/*Get all Contents for pagination */
exports.getAllContentsForPagination = function (req, res) {
    console.log('Content Controller: entering getAllContentsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Contents*/
    Content.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (contents) {
        /*Return an array of contents */
        res.jsonp(contents);
    }).catch(function (err) {
        console.log('could not fetch all contents for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllContentsForPagination*/

/*Get all sorted Contents  */
exports.getAllContentsSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllContentsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Contents*/
    Content.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (contents) {
        /*Return an array of Contents */
        res.jsonp(contents);
    }).catch(function (err) {
        console.log('could not fetch all Contents for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllContentsSortedByColumn*/

/*Get all filtered Contents */
exports.getAllContentsFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllContentsFilteredByColumn');
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
    Content.findAll(criteria).then(function (contents) {
        /*Return an array of pages */
        res.jsonp(contents);
    }).catch(function (err) {
        console.log('could not fetch all Contents for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllContentsFilteredByColumn*/


/*Get all Contents by search text */
exports.getAllContentsBySearchText = function (req, res) {
    console.log('Content Controller: entering getAllContentsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('title'), Sequelize.col('type'), Sequelize.col('media_type'), Sequelize.col('media_url'), Sequelize.col('griha_nirman_description'), Sequelize.col('contact_address'), Sequelize.col('contact_email'), Sequelize.col('contact_toll_free_number'), Sequelize.col('lang'), Sequelize.col('slug'), Sequelize.col('created'), Sequelize.col('updated'), Sequelize.col('created_by'), Sequelize.col('updated_by')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all contents*/
    Content.findAll(criteria).then(function (contents) {
        /*Return an array of pages */
        res.jsonp(contents);
    }).catch(function (err) {
        console.log('could not fetch all contents for search');
        console.log('err: %j', err);
    });
}; /*End of getAllContentsBySearchText*/