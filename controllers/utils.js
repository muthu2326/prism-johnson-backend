const log = require('../utils/logger').get();
const https = require('https');
const util = require('../utils/util');
var request = require("request");
config = require('config');
const FILE_INFO = 'Utils Controller';

const db = require('../models');
const cityMasterModel = db.city_master;
const hindiTextPOCModel = db.hindi_text_poc;
const GRIH_NIRMAN =   require('../docs/api-mock-json/grih-nirman-sections.json')

var getAllCities = (req,res) => {
    const FUN_LABEL = `\n\t getAllCities ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    cityMasterModel.findAndCountAll().then(result=> {
        log.info(`${FUN_LABEL} got result for cityMasterModel.findAndCountAll`);
        log.debug(result);
        let all_state_cities = []
        let state = {};
        let city = {};
        let cities = [];
        let rawCities = [];
        rawCities = util.formatJSONBasedOnLang(result.rows, req.query.lang);
        rawCities.forEach((element, index) => {
            if(index !== 0) {
                if(element.state === result.rows[index-1].state){
                    city = {};
                    city.name = element.city;
                    city.id = element.id;
                    state.cities.push(city);
                } else if(element.state !== result.rows[index-1].state){
                    // log.debug(`\n\n >>>>>>>> State: ${JSON.stringify(state)} >>>>>>>>`)
                    all_state_cities.push(state);
                    state = {};
                    state.name = element.state;
                    state.cities = [];
                    city = {};
                    city.name = element.city;
                    city.id = element.id;
                    state.cities.push(city);
                }
            } else if(index === 0){
                state.name = element.state;
                state.cities = [];
                city.name = element.city;
                city.id = element.id;
                state.cities.push(city);
                if(result.count === 1) {
                    all_state_cities.push(state);
                }
            }
            if(result.count-1 === index) {
                all_state_cities.push(state);
            }
        });
        response = [];
        response = all_state_cities;
        log.info(`${FUN_LABEL} OUT`);
        res.header('X-Total-Count', Number(result.count));
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

var getGrihNirmanDetails = (req, res) => {
    const FUN_LABEL = `\n\t getGrihNirmanDetails ${FILE_INFO} \n\t`; 
    // let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send(GRIH_NIRMAN);
}

var getHindiContentPOC = (req, res) => {
    const FUN_LABEL = `\n\t getHindiContentPOC ${FILE_INFO} \n\t`; 
    // let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    hindiTextPOCModel.findAndCountAll().then(result=> {
        log.info(`${FUN_LABEL} got result for hindiTextPOCModel.findAndCountAll`);
        log.debug(result);
        res.status(200).send(result);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in hindiTextPOCModel.findAndCountAll`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_hindi_text';
        response.message = 'Unable to fetch hindi text';
        response.error_details = err;
        return res.status(500).send(response);
    })
}

var storeHindiContentPOC = (req, res) => {
    const FUN_LABEL = `\n\t getHindiContentPOC ${FILE_INFO} \n\t`; 
    // let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let entity = {
        name: req.body.name
    }
    hindiTextPOCModel.create(entity).then(result=> {
        log.info(`${FUN_LABEL} got result for hindiTextPOCModel.findAndCountAll`);
        log.debug(result);
        res.status(200).send(result);
    }).catch(err=>{
        log.error(`${FUN_LABEL} error in hindiTextPOCModel.findAndCountAll`);
        log.error(err);
        log.info(`${FUN_LABEL} OUT`);
        response.code = 'error_fetch_hindi_text';
        response.message = 'Unable to fetch hindi text';
        response.error_details = err;
        return res.status(500).send(response);
    })
}

var sendSMSPOC = (req, res) => {
    /**
     * REFER: http://bhashsms.com/index.php
     * Compose Single / GROUP SMS
     * 
     */
    const FUN_LABEL = `\n\t sendSMSPOC ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let smsContent = `TestSMS2ENcoded`;
    var options = {
        method: 'GET',
        url: `http://bhashsms.com/api/sendmsg.php?user=prismcement&pass=pcl@2017&sender=PRISMC&phone=9786215105&text=${encodeURI(smsContent)}&priority=ndnd&stype=normal`,
        // headers: {
        //     'x-auth-client': bigcommerce_client_id,
        //     'x-auth-token': bigcommerce_auth_token
        // }
    };

    request(options, function(error, response, body) {
        if (error) {
            // throw new Error(error);
            res.status(500).send("Could not send SMS")
        } 

        log.debug(body);
        res.status(200).send("SMS has been sent");
    });
}
module.exports = {
    getAllCities,
    getGrihNirmanDetails,
    getHindiContentPOC,
    storeHindiContentPOC,
    sendSMSPOC
};
