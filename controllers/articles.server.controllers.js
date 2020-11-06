/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/db');

console.log('db', db)

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

// var ArticleModel = require('../models/init-models');
// var Article = ArticleModel.initModels(db.getDbConnection())

var db1 = require('../models');
var Article = db1.articles

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create articles record.*/
exports.createArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering createArticle ');

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }

    let NOW = new Date()
    Article.create({
        id : req.body.id,
				type : req.body.type,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				title : req.body.title,
				short_description : req.body.short_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : NOW,
				updated : NOW
    }).then(function(result) {
        console.log('created articles', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create articles record');
        console.log('err: %j', err);
    });

} /*End of createArticle*/


/*Get a single articles */
exports.getArticle = function(req, res) {
    var articles_id = req.params.articles_id;
    console.log('Article Controller: entering getArticle ');
    /*Validate for a null id*/
    if (!articles_id) {
        res.status(400).send("articles ID is null");
        return;
    }
    /* Query DB using sequelize api for a single articles*/
    Article.findOne({
        where: {
            id: articles_id
        }
    }).then(function(articles) {
        console.log(articles);
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch articles');
        console.log('err: %j', err);
    });
} /*End of getArticle*/

/*Get all Articles */
exports.getAllArticles = function(req, res) {
    console.log('Article Controller: entering getAllArticles');
    /* Query DB using sequelize api for all Articles*/
    Article.findAll().then(function(articles) {
        /*Return an array of Articles */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all articles');
        console.log('err: %j', err);
    });
}; /*End of getAllArticles*/


/*Update articles record.*/
exports.updateArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering updateArticle ');

    var articles_id = req.params.articles_id;
    Article.update({
        id : req.body.id,
				type : req.body.type,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				title : req.body.title,
				short_description : req.body.short_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* articles table primary key */
            id: articles_id
        }
    }).then(function(result) {
        console.log('updated articles', result);
        res.send("articles updated successfully");
    }).catch(function(err) {
        console.log('Could not update articles record');
        console.log('err: %j', err);
    });

} /*End of updateArticle*/

/*Delete a single article */
exports.deleteArticle = function(req, res) {
    console.log('Article Controller: entering deleteArticle ');

    var articles_id = req.params.articles_id;
    /*Validate for a null articles_id*/
    if (!articles_id) {
        res.status(400).send("articles ID is null");
        return;
    }
    /* Delete articles record*/
    Article.destroy({
        where: {
            id: articles_id
        }
    }).then(function(article) {
        console.log(article);
        res.jsonp(article);
    }).catch(function(err) {
        console.log('could not delete article');
        console.log('err: %j', err);

    });
} /*End of deleteArticle*/


/*Get all Articles for pagination */
exports.getAllArticlesForPagination = function(req, res) {
    console.log('Article Controller: entering getAllArticlesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Articles*/
    Article.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(articles) {
        /*Return an array of articles */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all articles for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesForPagination*/

/*Get all sorted Articles  */
exports.getAllArticlesSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllArticlesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Articles*/
    Article.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(articles) {
        /*Return an array of Articles */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all Articles for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesSortedByColumn*/

/*Get all filtered Articles */
exports.getAllArticlesFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllArticlesFilteredByColumn');
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
    Article.findAll(criteria).then(function(articles) {
        /*Return an array of pages */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all Articles for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesFilteredByColumn*/


/*Get all Articles by search text */
exports.getAllArticlesBySearchText = function(req, res) {
    console.log('Article Controller: entering getAllArticlesBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('type'),Sequelize.col('media_type'),Sequelize.col('media_url'),Sequelize.col('title'),Sequelize.col('short_description'),Sequelize.col('description'),Sequelize.col('lang'),Sequelize.col('slug'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all articles*/
    Article.findAll(criteria).then(function(articles) {
        /*Return an array of pages */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all articles for search');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesBySearchText*/