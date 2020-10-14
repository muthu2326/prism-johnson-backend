const log = require('../utils/logger').get();
const util = require('../utils/util');
config = require('config');
const FILE_INFO = 'Products Controller';

const db = require('../models');
// const ProductModel = db.Product;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;
const ALL_PRODUCTS =   require('../docs/api-mock-json/products.json')
const PRODUCT =   require('../docs/api-mock-json/product.json')

var getAllProducts = (req,res) => {
    const FUN_LABEL = `\n\t getAllProducts ${FILE_INFO} \n\t`; 
    let response = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send(util.formatJSONBasedOnLang(ALL_PRODUCTS, req.query.lang));
}

var getOneProductDetails = (req, res) => {
    const FUN_LABEL = `\n\t getOneProductDetails ${FILE_INFO} \n\t`; 
    let apiResponse = util.formatJSONBasedOnLang([PRODUCT], req.query.lang)[0];
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(req.query.pincode === "560102") {
        apiResponse.price = 400
    } else if(req.query.pincode === "473665") {
        apiResponse.price = 375
    }
    else {
        apiResponse.price = 325
    }
    res.status(200).send(apiResponse); 
}

var createProduct = (req,res) => {
    const FUN_LABEL = `\n\t createProduct ${FILE_INFO} \n\t`; 
    let response = {};
    let ProductObject = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');
}

var updateProduct = (req,res) => {
    const FUN_LABEL = `\n\t updateProduct ${FILE_INFO} \n\t`; 
    let response = {};
    let ProductObjectToBeUpdated = {};
    let ProductId = null;
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');  
}

var deleteProduct = (req,res) => {
    const FUN_LABEL = `\n\t deleteProduct ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');
}

module.exports = {
    getAllProducts,
    getOneProductDetails,
    createProduct,
    updateProduct,
    deleteProduct
};
