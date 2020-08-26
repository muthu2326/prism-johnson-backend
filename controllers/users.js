const log = require('../utils/logger').get();
config = require('config');
log.setLevel(config.log_level);
const db = require('../models');
const userModel = db.user;
const cityMasterModel = db.city_master;

const FILE_INFO = 'Users Controller';

var getUsers = (req,res) => {
    const FUN_LABEL = `\n\t getUsers ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    userModel.findAndCountAll({
        include:[{
            model:cityMasterModel,
            attributes:['city', 'state']
        }]
    }).then(result=> {
        log.info(`${FUN_LABEL} got result for userModel.findAll`);
        log.debug(result);
        response.users = []
        response.count = result.count;
        if(result.count > 0) {
            let user = {};
            result.rows.forEach((element, index) => {
                user.id = element.id;
                user.name = element.name;
                user.email = element.email;
                user.phone_number = element.phone_number;
                user.city_id = element.city_id;
                user.city = element.city_master.city;
                user.state = element.city_master.state; 
                response.users.push(user);
                user = {};
            });
        }
        log.info(`${FUN_LABEL} OUT`);
        res.header('X-Total-Count', Number(response.count));
        res.status(200).send(response);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in userModel.findAll`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_users';
        response.message = 'Unable to fetch users';
        response.error_details = err;
        return res.status(500).send(response);
    })
}

var createUser = (req,res) => {
    const FUN_LABEL = `\n\t createUser ${FILE_INFO} \n\t`; 
    let response = {};
    let userObject = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    let payloadValidationResult = hasMandatoryFieldsToCreateUser(req.body);
    log.debug(`${FUN_LABEL} payloadValidationResult: ${JSON.stringify(payloadValidationResult)}`);
    if(payloadValidationResult.valid) {
        userObject.id = req.body.id ? Number(req.body.id) : undefined;
        userObject.name = req.body.name;
        userObject.email = req.body.email;
        userObject.phone_number = req.body.phone_number ? req.body.phone_number : undefined;
        userObject.city_id = Number(req.body.city_id);
        log.debug(`${FUN_LABEL} userObject:`);
        log.debug(userObject);
        userModel.upsert(userObject).then(result => {
            log.info(`${FUN_LABEL} user inserted`);
            log.info(result);
            response = {
                "name": req.body.name,
                "address": req.body.address
            }
            log.info(`${FUN_LABEL} OUT`);
            res.status(200).send(response);
        }).catch(err => {
            log.error(`${FUN_LABEL} error in creating user`);
            log.error(err);
            response = {
                'code': 'create_user_failed',
                'message': 'Unable to create user',
                'error_details': err
            }
            if(err.parent && err.parent.code === 'ER_NO_REFERENCED_ROW_2') {
                response.message = "Provided city is invalid"
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

var hasMandatoryFieldsToCreateUser = (userObject) => {
    const FUN_LABEL = `\n\t hasMandatoryFieldsToCreateUser ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    let response = {};
    if(!userObject.email || !userObject.name) {
        response.valid = false;
        response.code = 'mandatory_fields_missing';
        response.message = 'Missing mandatory fields: '
        if(!userObject.name) {
            response.message = response.message + 'name';
        }
        if(!userObject.city_id) {
            response.message = response.message + ', city_id';
        }
        if(!userObject.email) {
            response.message = response.message + ', email';
        }
    } else {
        response.valid = true;
    }
    log.info(`${FUN_LABEL} OUT`);
    return response;
}
module.exports = {
    getUsers,
    createUser
};
