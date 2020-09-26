const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Utils Controller';

const db = require('../models');
const cityMasterModel = db.city_master;
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
        result.rows.forEach((element, index) => {
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
module.exports = {
    getAllCities,
    getGrihNirmanDetails
};
