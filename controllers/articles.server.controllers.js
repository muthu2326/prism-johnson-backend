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

var ArticleModel = require('../models/init-models');
var Article = ArticleModel.initModels(db).articles

var SectionModel = require('../models/init-models');
var Section = SectionModel.initModels(db).sections

Article.hasMany(Section, {foreignKey: 'article_id'});
/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create articles record.*/
exports.createArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering createArticle ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let NOW = new Date()
    let slug = slugify(`${uuidv4().slice(4, 12)}`)
    let lang = req.query.lang ? req.query.lang : 'en'

    Article.create({
        type : req.body.type,
        category: req.body.category,
        media_type : req.body.media_type,
        media_url : req.body.media_url,
        title : req.body.title,
        short_description : req.body.short_description,
        description : req.body.description,
        lang : lang,
        slug : req.body.slug? req.body.slug : slug,
        created : NOW,
        updated : NOW
    }).then(function(result) {
        console.log('created articles', result);
        let article_id = result.dataValues.id
        let slug;
        if(req.body.sections.length > 0){
            let sections = req.body.sections.map((item) => {
                slug = slugify(`${uuidv4().slice(4, 12)}`)
                return {
                    type: item.type,
                    article_id: article_id,
                    media_type: item.media_type,
                    sub_title: item.title,
                    description: item.description,
                    features: item.features,
                    lang: item.lang ? item.lang: 'en',
                    slug: item.slug? item.slug : slug
                }
            })
            Section.bulkCreate(sections)
            .then(function(data){
                result.dataValues.sections = data
                res.jsonp({
                    status: 200,
                    data: {
                        id: `Successfully created article ${result.id}`,
                        msg: 'success'
                    },
                    error: {}
                });
                return;
            })
        }else{
            res.jsonp({
                status: 200,
                data: [],
                error: {}
            });
            return;
        }
    }).catch(function(err) {
        console.log('Could not create articles record');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong
            }
        });
        return;
    });

} /*End of createArticle*/


/*Get a single articles */
exports.getArticle = function(req, res) {
    var slug = req.params.slug;
    console.log('Article Controller: entering getArticle ');
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
    /* Query DB using sequelize api for a single articles*/
    let lang = req.query.lang ? req.query.lang : 'en'

    Article.findOne({
        where: {
            id: slug,
            lang: lang
        }
    }).then(function(articles) {
        console.log(articles);
        res.jsonp({
            status: 200,
            data: articles,
            error: {}
        });
    }).catch(function(err) {
        console.log('could not fetch articles');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong
            }
        });
        return;
    });
} /*End of getArticle*/

/*Get all Articles */
exports.getAllArticles = function(req, res) {
    console.log('Article Controller: entering getAllArticles');
    /* Query DB using sequelize api for all Articles*/
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

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

    if (!req.query.category) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let type = req.query.type   
    let category = req.query.category
    let lang = req.query.lang ? req.query.lang : 'en'

    Article.findAll({
        where: {
            type: type,
            category: category,
            lang: lang
        },
        include: Section
    }).then(function(articles) {
        /*Return an array of Articles */
        let response = []
        articles.forEach(article => {
            let sections_response = []
            article.sections.forEach((section) => {
                let obj = {}
                obj.id = section.id
                delete section.id
                obj.value = section
                sections_response.push(obj)
            })
            article.sections = sections_response
            response.push(article)
        });
        res.jsonp({
            status: 200,
            data: response,
            error: {}
        });
    }).catch(function(err) {
        console.log('could not fetch all articles');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong
            }
        });
        return;
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