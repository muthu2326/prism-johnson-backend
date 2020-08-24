const log = require('../utils/logger').get();
config = require('config');
log.setLevel(config.log_level);
const FILE_INFO = 'Users Controller';

var getUsers = (req,res) => {
    const FUN_LABEL = `\n\t getUsers ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    response = {
         "users":[{
             "name":"Manoj",
             "email":"manoj@digiapt.com",
             "phone_number":"9898989898",
             "state":"AP",
             "town":"AP town"
         },{
             "name":"Babu",
             "email":"babu@digiapt.com",
             "phone_number":"9898989897",
             "state":"TN",
             "town":"TN town"
         }]
    }
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send(response);
}

var createUser = (req,res) => {
    const FUN_LABEL = `\n\t createUser ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    if(!req.body.email) {
        response.code = 'email_missing';
        response.message = 'email is mandatory';
        log.info(`${FUN_LABEL} OUT`);
        return res.status(400).send(response);
        
    }
    log.info(`${FUN_LABEL} OUT`);
    response = {
        "name": req.body.name,
        "email": req.body.email
    }
    res.status(200).send(response);
}
module.exports = {
    getUsers,
    createUser
};
