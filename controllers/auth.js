const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Auth Controller';
const db = require('../models');
const util = require('../utils/util');
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;

var login = (req,res) => {
    const FUN_LABEL = `\n\t login ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req auth ${JSON.stringify(req.authorization)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse = {
        "code" : "login_success",
        "message" : "User logged in successfully",
        "token" : "asdjhasjdasd",
        "role" : "admin" 
    }    
    res.status(200).send(apiResponse);
}

var logout = (req,res) => {
    const FUN_LABEL = `\n\t logout ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse = {
        "code" : "logout_success",
        "message" : "User has been logged out successfully"
    }    
    res.status(200).send(apiResponse);
}

var sendResetPasswordLink = (req,res) => {
    const FUN_LABEL = `\n\t sendResetPasswordLink ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse = {
        "code" : "success_link_sent",
        "message" : "Reset password link been sent to your email"
    }    
    res.status(200).send(apiResponse);
}

var resetPassword = (req,res) => {
    const FUN_LABEL = `\n\t resetPassword ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    // log.info(`${FUN_LABEL} req header ${JSON.stringify(req.headers)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    apiResponse = {
        "code" : "success_password_reset",
        "message" : "Your password has been reset, please login into application"
    }    
    res.status(200).send(apiResponse);
}
module.exports = {
    login,
    logout,
    sendResetPasswordLink,
    resetPassword
    // changePassword
};
