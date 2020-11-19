var request = require("request");
const nodemailer = require("nodemailer");
const await = require("await");
var db = require('../db/connection/db');

var CredentialModel = require('../models/init-models');
var Credential = CredentialModel.initModels(db).credentials;

exports.sendEmail = (to, subject, body) => {
    Credential.findOne({
        where: {
            type: 'nodemailer'
        }
    }).then(function(credentials) {
        console.log(credentials);
        if(credentials != null){
            let credentialsData = credentials.dataValues
            let transporter = nodemailer.createTransport({
                host: credentialsData.value.host,
                port: credentialsData.value.port,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: credentialsData.value.username, // generated ethereal user
                    pass: credentialsData.value.password, // generated ethereal password
                },
            });
            transporter.sendMail({
                from: 'Prism Cement Services <cement.itservices@prismjohnson.in>', // sender address
                to: to,
                subject: subject,
                html: body
            });
        }else{
            console.log('no nodemailer credentials', credentials)
            return;
        }
    }).catch(function(err) {
        console.log('could not fetch nodemailer credentials');
        console.log('err:', err);
        return;
    });
}

exports.sendSMS = (phone_numbers, msg) => {
    let smsContent = `TestSMS2ENcoded`;
    var options = {
        method: 'GET',
        url: `http://bhashsms.com/api/sendmsg.php?user=prismcement&pass=pcl@2017&sender=PRISMC&phone=${phone_numbers}&text=${encodeURI(msg)}&priority=ndnd&stype=normal`,
        // headers: {
        //     'x-auth-client': "",
        //     'x-auth-token': ""
        // }
    };

    request(options, function (error, response, body) {
        if (error) {
            // throw new Error(error);
            console.log("Could not send SMS")
        }
        console.log("SMS has been sent");
        console.log('response', JSON.stringify(response))
    });
}