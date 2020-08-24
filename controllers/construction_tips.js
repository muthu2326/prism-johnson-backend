const log = require('../utils/logger').get();
config = require('config');
log.setLevel(config.log_level);
const FILE_INFO = 'Construction Tips Controller';

var getAllConstructionTips = (req,res) => {
    const FUN_LABEL = `\n\t getAllConstructionTips ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(req.query && req.query.ctcid) {
        response = {
            "type":"category specific",
            "specific_category_tips":[
                {
                    "c_id":1,
                    "c_name":"Builder solutions",
                    "c_tips":[
                            {
                            "id":1,
                            "title":"title1",
                            "description":"tip description"
                        },
                        {
                            "id":2,
                            "title":"title2",
                            "description":"tip description2"
                        }
                    ]
                }
            ]
        }
    } else {
        response = {
            "type":"all",
            "tips":[
                {
                    "c_id":1,
                    "c_name":"Builder solutions",
                    "c_tips":[
                            {
                            "id":1,
                            "title":"title1",
                            "description":"tip description"
                        },
                        {
                            "id":2,
                            "title":"title2",
                            "description":"tip description2"
                        }
                    ]
                },
                {
                    "c_id":2,
                    "c_name":"Architect solutions",
                    "c_tips":[
                            {
                            "id":3,
                            "title":"title3",
                            "description":"tip description"
                        },
                        {
                            "id":4,
                            "title":"title4",
                            "description":"tip description2"
                        }
                    ]
                }
            ]
        }
    }
    
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send(response);
}

var createConstructionTips = (req,res) => {
    const FUN_LABEL = `\n\t createConstructionTips ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(!req.body.title) {
        response.code = 'title_missing';
        response.message = 'title is mandatory';
        log.info(`${FUN_LABEL} OUT`);
        return res.status(400).send(response);
        
    }
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "title": req.body.title,
        "description": req.body.description
    }
    res.status(200).send(response);
}

var updateConstructionTips = (req,res) => {
    const FUN_LABEL = `\n\t updateConstructionTips ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    if(!req.body.title) {
        response.code = 'title_missing';
        response.message = 'title is mandatory';
        log.info(`${FUN_LABEL} OUT`);
        return res.status(400).send(response);
        
    }
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "id": req.params.id,
        "title": req.body.title,
        "description": req.body.description
    }
    res.status(200).send(response);
}

var deleteConstructionTips = (req,res) => {
    const FUN_LABEL = `\n\t deleteConstructionTips ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "code":"deleted_construction_tip",
        "message":"deleted construction tips id"
    }
    res.status(200).send(response);
}

module.exports = {
    getAllConstructionTips,
    createConstructionTips,
    updateConstructionTips,
    deleteConstructionTips
};
