const log = require('../utils/logger').get();
const fs = require('fs');
config = require('config');
const FILE_INFO = 'Orders Controller';

const db = require('../models');
// const OrderModel = db.Order;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;

var getAllOrders = (req,res) => {
    const FUN_LABEL = `\n\t getAllOrders ${FILE_INFO} \n\t`;
    let apiResponse = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let data = req.body;
    let newOrder = {};
    req.body.created_at = new Date();
    req.body.user_agent = req.headers['user-agent'];
    log.info("Starting file writing - existing user");
    fs.appendFileSync(`docs/db/temp_orders/all_orders.json`, JSON.stringify(req.body), 'utf8');
    log.info("Finishing file writing - existing user");
    apiResponse.code = 'order_placed'
    apiResponse.message = 'Order has been placed successfully';
    res.send(apiResponse);
}

var getOneOrderDetails = (req, res) => {
    const FUN_LABEL = `\n\t getOneOrderDetails ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send("Not implemented yet");
}

var createOrder = (req,res) => {
    const FUN_LABEL = `\n\t createOrder ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    let apiResponse = {};
    req.body.created_at = new Date();
    req.body.user_agent = req.headers['user-agent'];
    log.info("Starting file writing - order");
    fs.appendFileSync(`docs/db/temp_orders/all_orders.json`, ","+JSON.stringify(req.body), 'utf8');
    log.info("Finishing file writing - order");
    apiResponse.code = 'order_placed'
    apiResponse.message = 'Order has been placed successfully';
    res.send(apiResponse);
}

var updateOrder = (req,res) => {
    const FUN_LABEL = `\n\t updateOrder ${FILE_INFO} \n\t`; 
    let response = {};
    let OrderObjectToBeUpdated = {};
    let OrderId = null;
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');  
}

var deleteOrder = (req,res) => {
    const FUN_LABEL = `\n\t deleteOrder ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');
}

module.exports = {
    getAllOrders,
    getOneOrderDetails,
    createOrder,
    updateOrder,
    deleteOrder
};
