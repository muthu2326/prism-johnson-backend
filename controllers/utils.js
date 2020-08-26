const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Utils Controller';

const db = require('../models');
const cityMasterModel = db.city_master;


var getAllCities = (req,res) => {
    const FUN_LABEL = `\n\t getAllCities ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    cityMasterModel.findAndCountAll().then(result=> {
        log.info(`${FUN_LABEL} got result for cityMasterModel.findAndCountAll`);
        log.debug(result);
        response.cities = result.rows;
        response.count = result.count;
        log.info(`${FUN_LABEL} OUT`);
        res.header('X-Total-Count', Number(response.count));
        res.status(200).send(response);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in cityMasterModel.findAndCountAll`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_cities';
        response.message = 'Unable to fetch cities';
        response.error_details = err;
        return res.status(500).send(response);
    })
}

module.exports = {
    getAllCities
};
