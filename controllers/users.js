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
        let users = [];
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
                users.push(user);
                user = {};
            });
        }
        log.info(`${FUN_LABEL} OUT`);
        response = users;
        res.header('X-Total-Count', Number(result.count));
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
        userObject.city_id = 4;//Number(req.body.city_id);
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
            res.status(500);
            response = {
                'code': 'create_user_failed',
                'message': 'Unable to create user',
                'error_details': err
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
        // if(!userObject.city_id) {
        //     response.message = response.message + ', city_id';
        // }
        if(!userObject.email) {
            response.message = response.message + ', email';
        }
    } else {
        response.valid = true;
    }
    log.info(`${FUN_LABEL} OUT`);
    return response;
}

var createAdminUser = (req,res) => {
    const FUN_LABEL = `\n\t createAdminUser ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse.code = 'success';
    apiResponse.message = 'User has been created successfully';
    apiResponse.data = {
        "id" : 1,
        "name" : req.body.name,
        "email" : req.body.email,
        "role" : req.body.role,
        "mobile" : req.body.mobile
    }
    res.status(200).send(apiResponse);
}

var updateAdminUser = (req,res) => {
    const FUN_LABEL = `\n\t updateAdminUser ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse.code = 'success';
    apiResponse.message = 'User has been updated successfully';
    apiResponse.data = {
        "id" : req.body.id,
        "name" : req.body.name,
        "email" : req.body.email,
        "role" : req.body.role,
        "mobile" : req.body.mobile
    }
    res.status(200).send(apiResponse);
}

var getAdminUsers = (req,res) => {
    const FUN_LABEL = `\n\t getAdminUsers ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse.code = 'success';
    apiResponse.message = 'User has been updated successfully';
    apiResponse.data = [
        {
            "id" : 1,
            "name" : "Nirmal",
            "email" : "nirmal@digiapt.com",
            "role" : "TTE",
            "mobile" : "989898989",
            "location" : {
                "state" : "Karnataka",
                "cities" : [
                    {
                        "id" : 1,
                        "name" : "Bangalore East"
                    },
                    {
                        "id" : 2,
                        "name" : "Bangalore West"
                    },
                    {
                        "id" : 3,
                        "name" : "Bangalore South"
                    },
                    {
                        "id" : 4,
                        "name" : "Bangalore North"
                    },
                    {
                        "id" : 5,
                        "name" : "Bellari"
                    }
                ]
            }
        },
        {
            "id" : 2,
            "name" : "Shreyas",
            "email" : "shreyas@digiapt.com",
            "role" : "TTE",
            "mobile" : "989898934",
            "location" : {
                "state" : "Karnataka",
                "cities" : [
                    {
                        "id" : 1,
                        "name" : "Bangalore East"
                    },
                    {
                        "id" : 2,
                        "name" : "Bangalore West"
                    },
                    {
                        "id" : 3,
                        "name" : "Bangalore South"
                    },
                    {
                        "id" : 4,
                        "name" : "Bangalore North"
                    },
                    {
                        "id" : 5,
                        "name" : "Bellari"
                    },
                    {
                        "id" : 6,
                        "name" : "Mandiya"
                    },
                    {
                        "id" : 7,
                        "name" : "Mysore"
                    }
                ]
            }
        }           
    ]
    res.header('X-Total-Count', apiResponse.data.length);
    res.status(200).send(apiResponse);
}

var deleteAdminUser = (req,res) => {
    const FUN_LABEL = `\n\t deleteAdminUser ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse.code = 'success';
    apiResponse.message = 'User has been deleted';
    apiResponse.data = {
        "id" : req.body.id
    }
    res.status(200).send(apiResponse);
}

var getOneAdminUser = (req,res) => {
    const FUN_LABEL = `\n\t getAdminUser ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse.code = 'success';
    apiResponse.message = 'User found & fetched';
    apiResponse.data = {
        "id" : Number(req.params.id),
        "name" : "Nirmal",
        "email" : "nirmal@digiapt.com",
        "role" : "TTE",
        "mobile" : "989898989",
        "location" : {
            "state" : "Karnataka",
            "cities" : [
                {
                    "id" : 1,
                    "name" : "Bangalore East"
                },
                {
                    "id" : 2,
                    "name" : "Bangalore West"
                },
                {
                    "id" : 3,
                    "name" : "Bangalore South"
                },
                {
                    "id" : 4,
                    "name" : "Bangalore North"
                },
                {
                    "id" : 5,
                    "name" : "Bellari"
                }
            ]
        }
    };
    // res.header('X-Total-Count', apiResponse.data.length);
    res.status(200).send(apiResponse);
}

module.exports = {
    getUsers,
    createUser,
    createAdminUser,
    updateAdminUser,
    getAdminUsers,
    getOneAdminUser,
    deleteAdminUser
};
