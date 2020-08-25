const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Dealers Controller';

const db = require('../models');
const dealerModel = db.dealer;
const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;


var getAllDealers = (req,res) => {
    const FUN_LABEL = `\n\t getAllDealers ${FILE_INFO} \n\t`; 
    let response = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(req.query && (req.query.state || req.query.pin_code)) {
        try {
            if(req.query.pin_code) {
                queryCondition = {
                    where:{
                        pin_code:Number(req.query.pin_code)
                    }
                }
            } else if(req.query.state){
                queryCondition = {
                    include:[{
                        model:cityMasterModel,
                        attributes:['city', 'state'],
                        where:{
                            state:req.query.state
                        }
                    }]
                }
                if(req.query.city) {
                    queryCondition.include[0].where.city = req.query.city;
                }
            }
            response.type = 'address specific dealers';
            log.debug(`${FUN_LABEL} constructed query constraints`);
            log.debug(queryCondition);
        } catch(e) {
            log.error(`${FUN_LABEL} error while constructing query constraints`);
            log.error(e)
        }
    } else {
        response.type = 'all';
    }
    dealerModel.findAll(queryCondition).then(result=> {
        log.info(`${FUN_LABEL} got result for dealerModel.findAll`);
        log.debug(result);
        response.dealers = result;
        log.info(`${FUN_LABEL} OUT`);
        res.status(200).send(response);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in dealerModel.findAll`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_dealers';
        response.message = 'Unable to fetch dealers';
        response.error_details = err;
        return res.status(500).send(response);
    })
}

var createDealer = (req,res) => {
    const FUN_LABEL = `\n\t createDealer ${FILE_INFO} \n\t`; 
    let response = {};
    let dealerObject = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);

    let payloadValidationResult = hasMandatoryFieldsToCreateDealer(req.body);
    log.debug(`${FUN_LABEL} payloadValidationResult: ${JSON.stringify(payloadValidationResult)}`);
    if(payloadValidationResult.valid) {
        dealerObject.name = req.body.name;
        dealerObject.address = req.body.address;
        dealerObject.phone = req.body.phone[0];
        dealerObject.alternate_phone_1 = req.body.phone[1];
        dealerObject.lat = req.body.lat;
        dealerObject.lang = req.body.lang;
        dealerObject.pin_code = req.body.pin_code;
        dealerObject.city_id = Number(req.body.city_id);
        log.debug(`${FUN_LABEL} dealerObject: ${dealerObject}`);
        dealerModel.create(dealerObject).then(result => {
            log.info(`${FUN_LABEL} dealer inserted`);
            log.info(result);
            response = {
                "name": req.body.name,
                "address": req.body.address
            }
            log.info(`${FUN_LABEL} OUT`);
            res.status(200).send(response);
        }).catch(err => {
            log.error(`${FUN_LABEL} error in creating dealer`);
            log.error(err);
            response = {
                'code': 'create_dealer_failed',
                'message': 'Unable to create dealer'
            }
            log.info(`${FUN_LABEL} OUT`);
            res.status(200).send(response);
        })
    } else {
        response = {
            'code': payloadValidationResult.code,
            'message': payloadValidationResult.message
        }
        res.status(400).send(response);
    }
}

var updateDealer = (req,res) => {
    const FUN_LABEL = `\n\t updateDealer ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(!req.body.name) {
        response.code = 'name_missing';
        response.message = 'name is mandatory';
        log.info(`${FUN_LABEL} OUT`);
        return res.status(400).send(response);
        
    }
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "id": req.params.id,
        "name": req.body.name,
        "description": req.body.address
    }
    res.status(200).send(response);
}

var deleteDealer = (req,res) => {
    const FUN_LABEL = `\n\t deleteDealer ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "code":"deleted_dealer",
        "message":"Deleted dealer Mahaveer Traders"
    }
    res.status(200).send(response);
}

var hasMandatoryFieldsToCreateDealer = (dealerObject) => {
    const FUN_LABEL = `\n\t hasMandatoryFieldsToCreateDealer ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    let response = {};
    if(!dealerObject.name || !dealerObject.city_id) {
        response.valid = false;
        response.code = 'mandatory_fields_missing';
        response.message = 'Missing mandatory fields: '
        if(!dealerObject.name) {
            response.message = response.message + 'name';
        }
        if(!dealerObject.city_id) {
            response.message = response.message + ', city_id';
        }
    } else {
        response.valid = true;
    }
    log.info(`${FUN_LABEL} OUT`);
    return response;
}

module.exports = {
    getAllDealers,
    createDealer,
    updateDealer,
    deleteDealer
};
