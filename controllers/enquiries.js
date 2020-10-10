const log = require('../utils/logger').get();
const fs = require('fs');
config = require('config');
const FILE_INFO = 'Enquiries Controller';

const db = require('../models');
// const EnquiryModel = db.Enquiry;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;

var getAllEnquiries = (req,res) => {
    const FUN_LABEL = `\n\t getAllEnquiries ${FILE_INFO} \n\t`;
    let apiResponse = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    let data = req.body;
    let newEnquiry = {};
    req.body.created_at = new Date();
    req.body.user_agent = req.headers['user-agent'];
    log.info("Starting file writing - existing user");
    fs.appendFileSync(`docs/db/temp_Enquiries/all_Enquiries.json`, JSON.stringify(req.body), 'utf8');
    log.info("Finishing file writing - existing user");
    apiResponse.code = 'Enquiry_placed'
    apiResponse.message = 'Enquiry has been placed successfully';
    res.send(apiResponse);
}

var getOneEnquiryDetails = (req, res) => {
    const FUN_LABEL = `\n\t getOneEnquiryDetails ${FILE_INFO} \n\t`; 
    let apiResponse = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send("Not implemented yet");
}

var createEnquiry = (req,res) => {
    const FUN_LABEL = `\n\t createEnquiry ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    let apiResponse = {};
    // if((req.body.enquiry_type !== "ask-expert") || (req.body.enquiry_type !== "contact-us")) {
    //     apiResponse.code = 'invalid_request';
    //     apiResponse.message = "Expected 'enquiry_type' type as 'ask-expert' or 'contact-us'";
    //     res.status(400).send(apiResponse);
    //     return;
    // }
    req.body.created_at = new Date();
    req.body.user_agent = req.headers['user-agent'];
    log.info("Starting file writing - Enquiry");
    fs.appendFileSync(`docs/db/temp_enquiries/all_enquiries.json`, ","+JSON.stringify(req.body), 'utf8');
    log.info("Finishing file writing - Enquiry");
    if(req.body.enquiry_type === "ask-expert") {
        apiResponse.code = 'expert_enquiry_recorded';
        apiResponse.detailed_message = 'The PRISM Expert team will connect with you shortly';
    } else {
        apiResponse.code = 'contact_enquiry_recorded';
        apiResponse.detailed_message = 'The PRISM team will connect with you shortly';
    }
    
    apiResponse.message = 'Thank You!';
    apiResponse.reference_no = "#12345678"
    res.send(apiResponse);
}

var updateEnquiry = (req,res) => {
    const FUN_LABEL = `\n\t updateEnquiry ${FILE_INFO} \n\t`; 
    let response = {};
    let EnquiryObjectToBeUpdated = {};
    let EnquiryId = null;
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');  
}

var deleteEnquiry = (req,res) => {
    const FUN_LABEL = `\n\t deleteEnquiry ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req body ${JSON.stringify(req.body)}`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.debug(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    res.status(200).send('API is not developed yet');
}

module.exports = {
    getAllEnquiries,
    getOneEnquiryDetails,
    createEnquiry,
    updateEnquiry,
    deleteEnquiry
};
