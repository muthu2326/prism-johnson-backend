const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Articles Controller';

const db = require('../models');
// const ArticleModel = db.Article;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;
const SECTION_ARTICLES =   require('../docs/api-mock-json/get-articles-of-a-section.json')
const ARTICLE =   require('../docs/api-mock-json/get-one-article.json')

var getAllArticles = (req,res) => {
    const FUN_LABEL = `\n\t getAllArticles ${FILE_INFO} \n\t`; 
    let response = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    // Mock response for get articles of one section
    res.status(200).send(SECTION_ARTICLES);
}

var getOneArticle = (req, res) => {
    const FUN_LABEL = `\n\t getOneArticle ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send(ARTICLE);
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
    createArticle,
    updateArticle,
    deleteArticle
};
