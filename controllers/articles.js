const log = require('../utils/logger').get();
config = require('config');
var articleService = require('../services/article.service.js');
const FILE_INFO = 'Articles Controller';
const HINDI_LANG = 'hi';
const ENGLISH_LANG = 'en';
const db = require('../models-old');
const util = require('../utils/util');
const MESSAGES = require('../utils/message.json');
let keysToBeRemoved = [];
let keysToBeModified = [];
let allKeys = [];
// const ArticleModel = db.Article;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;
const SECTION_ARTICLES =   require('../docs/api-mock-json/get-articles-of-a-section.json')
const ARTICLE =   require('../docs/api-mock-json/get-one-article.json')
const GRIH_NIRMAN =   require('../docs/api-mock-json/grih-nirman-sections.json');
const article = require('../models-old/article');
var getAllArticles = (req,res) => {
    const FUN_LABEL = `\n\t getAllArticles ${FILE_INFO} \n\t`; 
    let response = {};
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let sec = Number(req.query.section)
    // response = SECTION_ARTICLES;
    let secName = '';
    try {
        GRIH_NIRMAN.stages.forEach(staging => {
            staging.sections.forEach(section => {
                if(section.id === sec) {
                    secName = section.name;
                }
            })
        });
        response.section_name = secName;
    } catch(e) {
        log.error(e)
    }
    if(sec) {
        queryCondition = {
            where :{
                section_id : sec 
            }
        }
    }
    log.info(`${FUN_LABEL} going to make articleService.getAllArticles call`);
    // articleService.getAllArticles(req, res, queryCondition, (error, serviceResponse) => {
    //     log.info(`${FUN_LABEL} received response for articleService.getAllArticles call`);
    //     log.debug(serviceResponse);
    //     log.debug(`Query string ${JSON.stringify(req.query)}`);
    //     log.debug(error);
    //     if(!error) {
    //         response.articles = []
    //         if(serviceResponse.result.length > 0) {
    //             response.articles = util.formatJSONBasedOnLang(serviceResponse.result, req.query.lang);
    //         }
    //         response.count = serviceResponse.result.length;
    //         if(sec) {
    //             response.section_name = response.articles[0]? response.articles[0].section_name : secName;
    //             response.section_id = sec;
    //             apiResponse.message = 'Fetched articles of this section';
    //         } else {
    //             response.section = 'All sections'
    //             apiResponse.message = 'Fetched articles of all sections';
    //         }
    //         apiResponse.code = 'fetched_articles';
    //         if(serviceResponse.result.length === 0) {
    //             apiResponse.message = "No articles available";
    //             apiResponse.code = "not_found";
    //         }
    //         apiResponse.data = response;
    //         res.status(200).send(apiResponse);
    //     } else {
    //         res.status(500).send(MESSAGES.server_error_message);
    //     }
    // })
    
    // Mock response for get articles of one section
    apiResponse.code = "Fetched articles of this section";
    apiResponse.message = "fetched_articles";
    apiResponse.data = {
        articles : [
            {
                "id" :1,
                "title" : "title name",
                "description" : "description content",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image"
            },
            {
                "id" :2,
                "title" : "2-title name",
                "description" : "2-description content",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image"
            },
            {
                "id" : 3,
                "title" : "3-title name",
                "description" : "3-description content",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image"
            }
        ],
        count: 4,
        section_name: "Budget",
        section_id: 1
    }
    res.header('X-Total-Count', 3);
    res.status(200).send(apiResponse);
}

var getOneArticle = (req, res) => {
    const FUN_LABEL = `\n\t getOneArticle ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let articleId = Number(req.params.id);
    queryCondition = {
        where: { id : articleId }
    };
    // articleService.getAnArticle(req, res, queryCondition, (error, serviceResponse) => {
    //     log.info(`${FUN_LABEL} received response for articleService.getAnArticle call`);
    //     log.debug(serviceResponse);
    //     log.debug(`Query string ${JSON.stringify(req.query)}`);
    //     log.debug(error);
    //     if(!error) {
    //         apiResponse.data = {};
    //         apiResponse.data = util.formatJSONBasedOnLang([serviceResponse.result], req.query.lang)[0];
    //         apiResponse.message = "fetched_article";
    //         apiResponse.code = "article_found";
    //         res.status(200).send(apiResponse);
    //     } else {
    //         res.status(500).send(MESSAGES.server_error_message);
    //     }
    // })
    apiResponse.data = {
        "id" : 1,
        "title" : "title of the article",
        "section_1" : {
            "sub_title" : "sub title of the article",
            "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
            "media_type" : "video",
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "features" : ["It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
                ,"he point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'"
                ,"Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"
            ]
        },
        "section-2" : {
            "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
            "media_type" : "image",
            "description" : "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        }
    }
    apiResponse.code = 'fetched_article';
    apiResponse.message = 'Fetched an article';
    res.status(200).send(apiResponse);
}

var createArticle = (req,res) => {
    const FUN_LABEL = `\n\t createArticle ${FILE_INFO} \n\t`; 
    let response = {};
    let ArticleObject = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.send('API not ready');

    // let payloadValidationResult = hasMandatoryFieldsToCreateArticle(req.body);
    // log.debug(`${FUN_LABEL} payloadValidationResult: ${JSON.stringify(payloadValidationResult)}`);
    // if(payloadValidationResult.valid) {
    //     try {
    //         ArticleObject.name = req.body.name;
    //         ArticleObject.address = req.body.address;
    //         ArticleObject.phone = req.body.phone_numbers[0];
    //         ArticleObject.alternate_phone_1 = req.body.phone_numbers[1];
    //         ArticleObject.lat = req.body.lat;
    //         ArticleObject.lang = req.body.lang;
    //         ArticleObject.pin_code = req.body.pin_code;
    //         ArticleObject.city_id = Number(req.body.city_id);
    //         log.debug(`${FUN_LABEL} ArticleObject: ${ArticleObject}`);
    //     } catch(e) {
    //         log.error(`${FUN_LABEL} error on constructing Article object based`);
    //         response = {
    //             'code': 'invalid_input_format',
    //             'address': 'Data format is not matching'
    //         }
    //         return res.status(400).send(response);
    //     }
        
    //     ArticleModel.create(ArticleObject).then(result => {
    //         log.info(`${FUN_LABEL} Article inserted`);
    //         log.info(result);
    //         response = {
    //             "name": req.body.name,
    //             "address": req.body.address
    //         }
    //         log.info(`${FUN_LABEL} OUT`);
    //         res.status(200).send(response);
    //     }).catch(err => {
    //         log.error(`${FUN_LABEL} error in creating Article`);
    //         log.error(err);
    //         res.status(500);
    //         response = {
    //             'code': 'create_Article_failed',
    //             'message': 'Unable to create Article'
    //         }
    //         if(err.parent && err.parent.code === 'ER_NO_REFERENCED_ROW_2') {
    //             response.message = "Provided city is invalid";
    //             res.status(400);
    //         }
    //         log.info(`${FUN_LABEL} OUT`);
    //         res.send(response);
    //     })
    // } else {
    //     response = {
    //         'code': payloadValidationResult.code,
    //         'message': payloadValidationResult.message
    //     }
    //     res.status(400).send(response);
    // }
}

var bulkInsertArticles = (req,res) => {
    const FUN_LABEL = `\n\t bulkInsertArticles ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let entities = req.body;
    articleService.bulkInsertArticles(req, res, entities, null, (error, serviceResponse) => {
        log.info(`Received response`)
        if(error) {
            res.send(error);
        } else {
            res.send(serviceResponse);
        }
    })
}

var updateArticle = (req,res) => {
    const FUN_LABEL = `\n\t updateArticle ${FILE_INFO} \n\t`; 
    let response = {};
    let ArticleObjectToBeUpdated = {};
    let ArticleId = null;
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.send('API not ready');
    // ArticleId = req.params.id;
    // ArticleObjectToBeUpdated.name = req.body.name ? req.body.name : undefined;
    // ArticleObjectToBeUpdated.address = req.body.address ? req.body.address : undefined;
    // ArticleObjectToBeUpdated.phone = req.body.phone_numbers ? (req.body.phone_numbers[0] ? req.body.phone_numbers[0] : undefined) : undefined;
    // ArticleObjectToBeUpdated.alternate_phone_1 = req.body.phone_numbers ? (req.body.phone_numbers[1] ? req.body.phone_numbers[1] : undefined)  : undefined;
    // ArticleObjectToBeUpdated.city_id = req.body.city_id ? req.body.city_id : undefined;
    // ArticleObjectToBeUpdated.pin_code = req.body.pin_code ? req.body.pin_code : undefined;
    // ArticleObjectToBeUpdated.lat = req.body.lat ? req.body.lat : undefined;
    // ArticleObjectToBeUpdated.lang = req.body.lang ? req.body.lang : undefined;
    // log.debug(`${FUN_LABEL} object to be updated:`);
    // log.debug(ArticleObjectToBeUpdated)
    // ArticleModel.update(ArticleObjectToBeUpdated, { where : { id:ArticleId } })
    // .then(result => {
    //     log.info(`${FUN_LABEL} executed ArticleModel.update query`);
    //     log.debug(result);
    //     response = {
    //         "id": req.params.id,
    //         "name": req.body.name,
    //         "description": req.body.address
    //     }
    //     log.info(`${FUN_LABEL} OUT`);
    //     res.status(200).send(response);
    // })
    // .catch(error => {
    //     log.error(`${FUN_LABEL} failed ArticleModel.update query`);
    //     log.error(error);
    //     response.code = 'update_Article_failed';
    //     response.message = 'Server error, unable to update Article. Please try again later';
    //     response.error_details = error;
    //     res.status(500).send(response);
    // })
}

var deleteArticle = (req,res) => {
    const FUN_LABEL = `\n\t deleteArticle ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    
    log.info(`${FUN_LABEL} OUT`);
    res.send('API not ready');
    // ArticleModel.destroy( { where : { id: Number(req.params.id)} } )
    // .then(result => {
    //     log.info(`${FUN_LABEL} Executed ArticleModel.destroy query`);
    //     log.debug(result);
    //     if(result) {
    //         response.message = 'Deleted the Article';
    //         log.info(`${FUN_LABEL} OUT`);
    //         res.status(200).send(response);
    //     } else {
    //         response.message = 'Article does not exists to delete';
    //         log.info(`${FUN_LABEL} OUT`);
    //         res.status(400).send(response);
    //     }
    // })
    // .catch(error => {
    //     log.error(`${FUN_LABEL} Error in ArticleModel.destroy query`);
    //     log.error(error);
    //     response.code = 'delete_Article_error';
    //     response.message = 'Unable to delete the requested Article';
    //     log.info(`${FUN_LABEL} OUT`);
    //     res.status(500).send(response);
    // })
    
    
}

module.exports = {
    getAllArticles,
    getOneArticle,
    bulkInsertArticles,
    createArticle,
    updateArticle,
    deleteArticle
};
