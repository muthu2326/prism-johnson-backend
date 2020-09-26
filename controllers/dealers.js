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
                // Below is to fetch based on city id
                queryCondition = {
                    include:[{
                        model:cityMasterModel,
                        attributes:['city', 'state'],
                        where:{
                            id:req.query.city_id
                        }
                    }]
                }
                // Below is to fetch based on city & state name 
                // queryCondition = {
                //     include:[{
                //         model:cityMasterModel,
                //         attributes:['city', 'state'],
                //         where:{
                //             state:req.query.state
                //         }
                //     }]
                // }
                // if(req.query.city) {
                //     queryCondition.include[0].where.city = req.query.city;
                // }
            }
            // response.type = 'address specific dealers';
            log.debug(`${FUN_LABEL} constructed query constraints`);
            log.debug(queryCondition);
        } catch(e) {
            log.error(`${FUN_LABEL} error while constructing query constraints`);
            log.error(e)
        }
    } else {
        // response.type = 'all';
    }
    dealerModel.findAndCountAll(queryCondition).then(result=> {
        log.info(`${FUN_LABEL} got result for dealerModel.findAll`);
        log.debug(result);
        response = [];
        response = result.rows;
        res.header('X-Total-Count', Number(result.count));
        log.info(`${FUN_LABEL} OUT`);
        res.header('X-Total-Count', Number(result.count));
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

var getOneDealerDetails = (req, res) => {
    const FUN_LABEL = `\n\t getOneDealerDetails ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    dealerModel.findOne({
        where:{ id: Number(req.params.id)},
        include:[{
            model:cityMasterModel,
            attributes:['city', 'state']
        }]
    }).then(result=> {
        log.info(`${FUN_LABEL} got result for dealerModel.findOne`);
        log.debug(result);
        response.id = result.id;
        response.name = result.name;
        response.address = result.address;
        response.phone_numbers = [];
        result.phone ? response.phone_numbers.push(result.phone): '';
        result.alternate_phone_1 ? response.phone_numbers.push(result.alternate_phone_1) : '';
        response.phone =  result.phone;
        response.alternate_phone_1 = result.alternate_phone_1;
        response.lat = result.lat;
        response.lang = result.lang;
        response.pin_code = result.pin_code;
        response.city_id = result.city_id;
        response.city = result.city_master.city;
        response.state = result.city_master.state;
        response.created = result.created;
        response.updated = result.updated;
        log.info(`${FUN_LABEL} OUT`);
        res.status(200).send(response);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in dealerModel.findOne`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_one_dealer';
        response.message = 'Unable to fetch this dealer details';
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
        try {
            dealerObject.name = req.body.name;
            dealerObject.address = req.body.address;
            dealerObject.phone = req.body.phone_numbers[0];
            dealerObject.alternate_phone_1 = req.body.phone_numbers[1];
            dealerObject.lat = req.body.lat;
            dealerObject.lang = req.body.lang;
            dealerObject.pin_code = req.body.pin_code;
            dealerObject.city_id = Number(req.body.city_id);
            log.debug(`${FUN_LABEL} dealerObject: ${dealerObject}`);
        } catch(e) {
            log.error(`${FUN_LABEL} error on constructing dealer object based`);
            response = {
                'code': 'invalid_input_format',
                'address': 'Data format is not matching'
            }
            return res.status(400).send(response);
        }
        
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
            res.status(500);
            response = {
                'code': 'create_dealer_failed',
                'message': 'Unable to create dealer'
            }
            if(err.parent && err.parent.code === 'ER_NO_REFERENCED_ROW_2') {
                response.message = "Provided city is invalid";
                res.status(400);
            }
            log.info(`${FUN_LABEL} OUT`);
            res.send(response);
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
    let dealerObjectToBeUpdated = {};
    let dealerId = null;
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    dealerId = req.params.id;
    dealerObjectToBeUpdated.name = req.body.name ? req.body.name : undefined;
    dealerObjectToBeUpdated.address = req.body.address ? req.body.address : undefined;
    dealerObjectToBeUpdated.phone = req.body.phone_numbers ? (req.body.phone_numbers[0] ? req.body.phone_numbers[0] : undefined) : undefined;
    dealerObjectToBeUpdated.alternate_phone_1 = req.body.phone_numbers ? (req.body.phone_numbers[1] ? req.body.phone_numbers[1] : undefined)  : undefined;
    dealerObjectToBeUpdated.city_id = req.body.city_id ? req.body.city_id : undefined;
    dealerObjectToBeUpdated.pin_code = req.body.pin_code ? req.body.pin_code : undefined;
    dealerObjectToBeUpdated.lat = req.body.lat ? req.body.lat : undefined;
    dealerObjectToBeUpdated.lang = req.body.lang ? req.body.lang : undefined;
    log.debug(`${FUN_LABEL} object to be updated:`);
    log.debug(dealerObjectToBeUpdated)
    dealerModel.update(dealerObjectToBeUpdated, { where : { id:dealerId } })
    .then(result => {
        log.info(`${FUN_LABEL} executed dealerModel.update query`);
        log.debug(result);
        response = {
            "id": req.params.id,
            "name": req.body.name,
            "description": req.body.address
        }
        log.info(`${FUN_LABEL} OUT`);
        res.status(200).send(response);
    })
    .catch(error => {
        log.error(`${FUN_LABEL} failed dealerModel.update query`);
        log.error(error);
        response.code = 'update_dealer_failed';
        response.message = 'Server error, unable to update dealer. Please try again later';
        response.error_details = error;
        res.status(500).send(response);
    })
}

var deleteDealer = (req,res) => {
    const FUN_LABEL = `\n\t deleteDealer ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    
    log.info(`${FUN_LABEL} OUT`);
    dealerModel.destroy( { where : { id: Number(req.params.id)} } )
    .then(result => {
        log.info(`${FUN_LABEL} Executed dealerModel.destroy query`);
        log.debug(result);
        if(result) {
            response.message = 'Deleted the dealer';
            log.info(`${FUN_LABEL} OUT`);
            res.status(200).send(response);
        } else {
            response.message = 'Dealer does not exists to delete';
            log.info(`${FUN_LABEL} OUT`);
            res.status(400).send(response);
        }
    })
    .catch(error => {
        log.error(`${FUN_LABEL} Error in dealerModel.destroy query`);
        log.error(error);
        response.code = 'delete_dealer_error';
        response.message = 'Unable to delete the requested dealer';
        log.info(`${FUN_LABEL} OUT`);
        res.status(500).send(response);
    })
    
    
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
    getOneDealerDetails,
    createDealer,
    updateDealer,
    deleteDealer
};
