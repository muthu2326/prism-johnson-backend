const log = require('../utils/logger').get();
config = require('config');
const db = require('../models');
const FILE_INFO = 'Article Service';
const articleModel = db.article;
const Op = db.Sequelize.Op;
const FOUND = 'records_found';
const NOT_FOUND = 'no_records_found';
const ERROR = 'error_in_fetching_records';
const DONE = 'entity_created';
const DUPLICATE_ENTRY = 'duplicate_entry';
const INVALID_INPUT = 'invalid_input';


// Create Multiple Articles
exports.bulkInsertArticles = (req, res, entities, condition, callback) => {
    const FUN_LABEL = `\n\t bulkInsertArticles ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`entity: ${JSON.stringify(entities)}`);
    let serviceResponse = {};
    if(!entities && entities.length === 0) {
        log.info('No entities received to create');
        serviceResponse.code = 'cannot_process_no_entity';
        callback(null, serviceResponse);
    }
    // articleModel.bulkCreate(entities, condition).then(result=> {
    articleModel.bulkCreate(entities).then(result=> {
        log.info(`${FUN_LABEL} got result for articleModel.bulkCreate`);
        log.debug(result);
        if(result) {
            log.debug('Articles created');
            serviceResponse.code = DONE;
            serviceResponse.result = result
        } else {
            log.debug('not created Articles');
            serviceResponse.code = DONE;
        }
        log.info(`${FUN_LABEL} OUT`);
        callback(null, serviceResponse);
    }).catch(error=>{
        log.error(`${FUN_LABEL} error in articleModel.bulkCreate`);
        log.error(error);
        log.info(`${FUN_LABEL} OUT`);
        if(error.parent && error.parent.code === 'ER_DUP_ENTRY') {
            serviceResponse.code = DUPLICATE_ENTRY;
            serviceResponse.error_details = error;
        } else {
            serviceResponse.code = ERROR;
            serviceResponse.error_details = error;
        }
        callback(error, serviceResponse);
    })
}

// Get All Articles
exports.getAllArticles = (req, res, conditions, callback) => {
    const FUN_LABEL = `\n\t getAllArticles ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`conditions: ${JSON.stringify(conditions)}`);
    let queryInclude = {};
    let serviceResponse = {};
    if(conditions) {
        queryInclude = conditions;
        articleModel.findAll(queryInclude).then(result=> {
            log.info(`${FUN_LABEL} articleModel.findAll`);
            log.debug(result);
            if(result) {
                log.debug('result found');
                serviceResponse.code = FOUND;
                serviceResponse.result = result
            } else {
                log.debug('result not found');
                serviceResponse.code = NOT_FOUND;
            }
            log.info(`${FUN_LABEL} OUT`);
            callback(null, serviceResponse);
        }).catch(error=>{
            log.error(`${FUN_LABEL} error in articleModel.findAll`);
            log.error(error);
            log.info(`${FUN_LABEL} OUT`);
            serviceResponse.code = ERROR;
            serviceResponse.error_details = error;
            callback(error, serviceResponse);
        })
    } else {
        log.error('Condition is null')
        serviceResponse.code = INVALID_INPUT;
        callback('error', serviceResponse);
    }
}

// Get a Article
exports.getAnArticle = (req, res, conditions, callback) => {
    const FUN_LABEL = `\n\t getAArticle ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`conditions: ${JSON.stringify(conditions)}`);
    let queryInclude = {};
    let serviceResponse = {};
    if(conditions) {
        queryInclude = conditions;
        articleModel.findOne(queryInclude).then(result=> {
            log.info(`${FUN_LABEL} articleModel.findOne`);
            log.debug(result);
            if(result) {
                log.debug('result found');
                serviceResponse.code = FOUND;
                serviceResponse.result = result
            } else {
                log.debug('result not found');
                serviceResponse.code = NOT_FOUND;
            }
            log.info(`${FUN_LABEL} OUT`);
            callback(null, serviceResponse);
        }).catch(error=>{
            log.error(`${FUN_LABEL} error in articleModel.findOne`);
            log.error(error);
            log.info(`${FUN_LABEL} OUT`);
            serviceResponse.code = ERROR;
            serviceResponse.error_details = error;
            callback(error, serviceResponse);
        })
    } else {
        log.error('Unable to get a article. since condition is null');
        serviceResponse.code = INVALID_INPUT;
        callback('error', serviceResponse);
    }
}