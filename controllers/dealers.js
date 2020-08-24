const log = require('../utils/logger').get();
config = require('config');
log.setLevel(config.log_level);
const FILE_INFO = 'Dealers Controller';

var getAllDealers = (req,res) => {
    const FUN_LABEL = `\n\t getAllDealers ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(req.query && (req.query.state || req.query.pin_code)) {
        response = {
            "type":"address specific",
            "address_specific_dealers":[
                {
                    "name":"Shiv Traders",
                    "address":"Kunauli Bazar, Suttar Pradeshaul - 847451",
                    "phone":["9771391953", "882527409"],
                    "state":"Bihar",
                    "town":"Suttar Pradeshaul",
                    "pin_code":"847451",
                    "lat":12.8723647,
                    "lang":0.77237467624
                },
                {
                    "name":"Abhay Hardware",
                    "address":"Nirmali, Nirmali, Nirmali, Suttar Pradeshaul, Bihar - 847452",
                    "phone":["9939524730"],
                    "state":"Bihar",
                    "town":"Suttar Pradeshaul",
                    "pin_code":"847451",
                    "lat":12.8723647,
                    "lang":0.77237467624
                }
            ]
        }
    } else {
        response = {
            "type":"all",
            "dealers":[
                {
                    "name":"Shiv Traders",
                    "address":"Kunauli Bazar, Suttar Pradeshaul - 847451",
                    "phone":["9771391953", "882527409"],
                    "state":"Bihar",
                    "town":"Suttar Pradeshaul",
                    "pin_code":"847451",
                    "lat":12.8723647,
                    "lang":0.77237467624
                },
                {
                    "name":"Abhay Hardware",
                    "address":"Nirmali, Nirmali, Nirmali, Suttar Pradeshaul, Bihar - 847452",
                    "phone":["9939524730"],
                    "state":"Bihar",
                    "town":"Suttar Pradeshaul",
                    "pin_code":"847451",
                    "lat":12.8723647,
                    "lang":0.77237467624
                },
                {
                    "name":"Om Khad Store",
                    "address":"Mill Road Nawada, Arrah, Bhojpur - 802301",
                    "phone":["9431027133"],
                    "state":"Bihar",
                    "town":"Arrah",
                    "pin_code":"802301",
                    "lat":12.8723647,
                    "lang":0.77237467624
                },
                {
                    "name":"Mahaveer Traders",
                    "address":"Village Acchroni,distt Shivpuri,shivpuri - 473665",
                    "phone":["9893149907"],
                    "state":"Madhya Pradesh",
                    "town":"Acchroni",
                    "pin_code":"473665",
                    "lat":12.8723647,
                    "lang":0.77237467624
                }
            ]
        }
    }
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send(response);
}

var createDealer = (req,res) => {
    const FUN_LABEL = `\n\t createDealer ${FILE_INFO} \n\t`; 
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
        "name": req.body.name,
        "address": req.body.address
    }
    res.status(200).send(response);
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

module.exports = {
    getAllDealers,
    createDealer,
    updateDealer,
    deleteDealer
};
