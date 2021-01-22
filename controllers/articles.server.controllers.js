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

    Article.create({
        type : req.body.type,
        category: req.body.category,
        media_type : req.body.media_type,
        media_url : req.body.media_url,
        title : req.body.title,
        short_description : req.body.short_description,
        description : req.body.description,
        lang : req.body.lang,
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
                    type: item.value.type,
                    article_id: article_id,
                    media_type: item.value.media_type,
                    media_url: item.value.media_url,
                    sub_title: item.value.sub_title,
                    description: item.value.description,
                    descriptions: item.value.descriptions,
                    features: item.value.features,
                    lang: item.value.lang ? item.value.lang: 'en',
                    slug: item.value.slug? item.value.slug : slug,
                    created: NOW,
                    updated: NOW
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
            result.sections = []
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

    /* Query DB using sequelize api for a single articles*/
    let lang = req.query.lang ? req.query.lang : 'en'
    let type = req.query.type   
    
    Article.findOne({
        where: {
            slug: slug,
            type: type,
            lang: lang
        },
        include: [{
            model: Section,
            where: {
                lang: lang
            }
        }]
    }).then(function(article) {
        console.log(article);
        if(article != null){
            console.log('article.dataValues.sections', article.dataValues.sections.length)
            article.dataValues.sections.forEach((section, j) => {
                let obj = {}
                obj.id = section.dataValues.id
                delete section.dataValues.id
                obj.value = section.dataValues
                delete article.dataValues.sections[j].dataValues
                article.dataValues.sections[j].dataValues = obj
                console.log("obj", obj)
                article.dataValues.deleted_sections = [];
            })
            res.jsonp({
                status: 200,
                data: article,
                error: {}
            });
        }else{
            res.jsonp({
                status: 200,
                data: {
                    title: "",
                    description: "",
                    media_type: "image",
                    media_url: null,
                    sections: [],
                },
                error: {}
            });
        }
    }).catch(function(err) {
        console.log('could not fetch article');
        console.log('err:', err);
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
        include: [{
            model: Section,
            where: {
                lang: lang
            }
        }]
    }).then(function(articles) {
        /*Return an array of Articles */
        console.log('articles', articles.length)
        if(articles.length > 0){
            articles.forEach((item) => {
                // console.log('item value for section\n', item.dataValues.sections[0])
                //console.log(item.dataValues.sections[0].dataValues)
                item.dataValues.sections.forEach((section, j) => {
                    let obj = {}
                    obj.id = section.dataValues.id
                    delete section.dataValues.id
                    obj.value = section.dataValues
                    delete item.dataValues.sections[j].dataValues
                    item.dataValues.sections[j].dataValues = obj
                })
            })
            res.jsonp({
                status: 200,
                data: articles,
                error: {}
            });
        }else{
            res.jsonp({
                status: 200,
                data: [],
                error: {}
            });
        }
    }).catch(function(err) {
        console.log('could not fetch all articles');
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
}; /*End of getAllArticles*/


/*Update articles record.*/
exports.updateArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering updateArticle ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let NOW = new Date()

    var articles_id = req.params.articles_id;


    if (!req.params.articles_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }
    if(req.body.deleted_sections) {
        /* Delete sections of an article */
        Section.destroy({
            where: {
                id: req.body.deleted_sections,
                lang: req.query.lang
            }
        })
        .then((sectionsDestroyed) => {
            console.log(`sectionsDestroyed result ${JSON.stringify(sectionsDestroyed)}`);
        }).catch((err) => {
            console.log('err in deleting sections for article_id', articles_id);
            console.log(err);
        })
    }

    Article.update({
        type : req.body.type,
        category: req.body.category,
        media_type : req.body.media_type,
        media_url : req.body.media_url,
        title : req.body.title,
        short_description : req.body.short_description,
        description : req.body.description,
        lang : req.body.lang,
        updated : NOW
    }, {
        where: {
            /* articles table primary key */
            id: articles_id
        }
    }).then(function(result) {
        console.log('updated articles', result);
        if(req.body.sections.length > 0){
            let sections = req.body.sections.map((item) => {
                console.log("item", !item.value.updated, item.value.updated === undefined, item.value.updated === null)
                if(!item.value.updated){
                    return {
                        // id: item.id,
                         type: item.value.type,
                         article_id: item.value.article_id,
                         media_url: item.value.media_url,
                         media_type: item.value.media_type,
                         sub_title: item.value.sub_title,
                         description: item.value.description,
                         descriptions : item.value.descriptions,
                         features: item.value.features,
                         lang: item.value.lang,
                         created: item.value.created,
                         updated: NOW
                     }
                }else{
                    return {
                         id: item.id,
                         type: item.value.type,
                         article_id: item.value.article_id,
                         media_url: item.value.media_url,
                         media_type: item.value.media_type,
                         sub_title: item.value.sub_title,
                         description: item.value.description,
                         descriptions : item.value.descriptions,
                         features: item.value.features,
                         lang: item.value.lang,
                         created: item.value.created,
                         updated: NOW
                     }

                }
                
            })
            console.log('sections', sections)
            Section.bulkCreate(sections, {updateOnDuplicate: ["type", "media_type", "media_url", "sub_title", "descriptions", "description", "features", "lang" , "updated"]})
            .then(function(data){
                console.log("data",data)
                res.jsonp({
                    status: 200,
                    data: {
                        id: `${message.article_updated} ${articles_id}`,
                        msg: 'success'
                    },
                    error: {}
                });
                return;
            })
            .catch(function(err) {
                console.log('could not update sections');
                console.log('err:', err);
                res.status(500).jsonp({
                    status: 500,
                    data: {},
                    error: {
                        msg: message.something_went_wrong
                    }
                });
                return;
            });
        }else{
            result.sections = []
            res.jsonp({
                status: 200,
                data: result,
                error: {}
            });
            return;
        }
    }).catch(function(err) {
        console.log('Could not update articles record');
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

} /*End of updateArticle*/

/*Delete a single article */
exports.deleteArticle = function(req, res) {
    console.log('Article Controller: entering deleteArticle ');

    var articles_id = req.params.articles_id;

     /*Validate for a null articles_id*/
    if (!req.params.articles_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    if (!req.query.lang) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request,
                err: err
            }
        });
        return;
    }

    /* Delete articles record*/
    let sections_ids = []
    Section.findAll({
        where: {
            article_id: articles_id,
            lang: req.query.lang
        }
    })
    .then((sections) => {
        if(sections.length > 0){
            sections.forEach((item) => {
                sections_ids.push(item.id)
            })
            console.log('sections length', sections_ids)
            Section.destroy({
                where: {
                    id: sections_ids
                }
            }).then((data) => {
                console.log('deleted sections', data)
                Article.destroy({
                    where: {
                        id: articles_id,
                        lang: req.query.lang 
                    }
                }).then(function(article) {
                    console.log('deleted article response', article);
                    res.jsonp({
                        status: 200,
                        data: {
                            msg: `${message.article_deleted} ${req.params.articles_id}`
                        },
                        error: {}
                    });
                    return;
                }).catch(function(err) {
                    console.log('could not delete article');
                    console.log('err: %j', err);
                    res.status(500).jsonp({
                        status: 500,
                        data: {},
                        error: {
                            msg: message.something_went_wrong,
                            err
                        }
                    });
                    return;
                });
            })
            .catch((err) => {
                console.log('removed all sections for article_id', articles_id)
            })
        }else{
            Article.destroy({
                where: {
                    id: articles_id,
                    lang: req.query.lang 
                }
            }).then(function(article) {
                console.log(article);
                res.jsonp({
                    status: 200,
                    data: {
                        msg: `${message.article_deleted} ${req.params.articles_id}`
                    },
                    error: {}
                });
                return;
            }).catch(function(err) {
                console.log('could not delete article');
                console.log('err: %j', err);
                res.status(500).jsonp({
                    status: 500,
                    data: {},
                    error: {
                        msg: message.something_went_wrong,
                        err
                    }
                });
                return;
            });
        }
    }).catch((err) => {
        console.log('err in geting all sections for article_id', articles_id)
        console.log(err)
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong,
                err: err
            }
        });
        return;
    })
    return;
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