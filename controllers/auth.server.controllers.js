/*Beans Copyright info*/

const bcrypt = require('bcrypt');
const saltRounds = 10;

var db = require('../db/connection/db');
var message  = require('../utils/message.json')
var { sendEmail } = require('../utils/notification_helper')

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var UserModel = require('../models/init-models');
var User = UserModel.initModels(db).user

var DealerModel = require('../models/init-models');
var Dealer = DealerModel.initModels(db).dealer

var StateModel = require('../models/init-models');
var State = StateModel.initModels(db).state

var CityModel = require('../models/init-models');
var City = CityModel.initModels(db).city

exports.login = function(req, res) {

    console.log('User Controller: entering Login ');
    console.log('request body :: ', req.body)

    /*Validate for a null email*/
    if(!req.body.email){
        console.log('missing email')
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.missing_email
            }
        });
        return;
    }

     /*Validate for a null password*/
    if(!req.body.password){
        console.log('missing password')
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.missing_password
            }
        });
        return
    }

    var email = req.body.email
    var role = req.body.role
    /* Query DB using sequelize api for a single user*/

    if(role != 'dealer'){
        User.findOne({
            where: {
                email: email,
                role: role
            }
        }).then(function(user) {
            console.log(user.dataValues);
            let check_password = bcrypt.compareSync(req.body.password, user.password);
            console.log('check password', check_password)
            delete user.dataValues.password
            user.dataValues.cities = user.dataValues.city_id? user.dataValues.city_id.split(",") : [];
            if(check_password){
                res.status(200).jsonp({
                    status: 200,
                    data: user,
                    message: message.success
                });
                return;
            }else{
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.invalid_login_credentials
                    }
                });
                return;
            }
        }).catch(function(err) {
            console.log('could not fetch user');
            console.log('err: %j', err);
            res.status(500).jsonp({
                status: 500,
                data: {},
                error: {
                    msg: message.something_went_wrong,
                    err: err
                }
            });
            return;
        });
    }else{
        Dealer.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            console.log(user);
            let check_password = bcrypt.compareSync(req.body.password, user.password);
            console.log('check password', check_password)
            delete user.dataValues.password;
            user.dataValues.role = `dealer`;
            let thisDealerCities = user.dataValues.cities;
            delete user.dataValues.cities;
            user.dataValues.cities = [];
            user.dataValues.cities.push(thisDealerCities);
            if(check_password){
                res.status(200).jsonp({
                    status: 200,
                    data: user,
                    message: message.success
                });
                return;
            }else{
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.invalid_login_credentials
                    }
                });
                return;
            }
        }).catch(function(err) {
            console.log('could not fetch user');
            console.log('err: %j', err);
            console.log(err);
            res.status(500).jsonp({
                status: 500,
                data: {},
                error: {
                    msg: message.something_went_wrong,
                    err: err
                }
            });
            return;
        });
    }
} /*End of user login*/


exports.forgotPassword = function(req, res) {
    console.log('User Controller: forgotPassword ');
    console.log('request body :: ', req.body)

    if(!req.body.email){
        console.log('missing email')
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.missing_email
            }
        });
        return;
    }

    let email = req.body.email
    
    User.findOne({
        where: {
            email: email
        },
        include: State
    }).then(function(user) {
        if(user != null){
            let name = user.dataValues.name
            let body = `<html><body>Hi ${name}, <br><br>Please click here to reset your password <a href="https://www.w3schools.com">Click here</a></body></html>`
            sendEmail(email, "Reset Password",body)
            console.log('sent email')
            res.status(200).jsonp({
                status: 200,
                data: {
                    msg: message.success
                },
               error: {}
            });
            return;
        }else{
            Dealer.findOne({
                where: {
                    email: email
                }
            }).then(function(dealer) {
                console.log(dealer);
                if(dealer != null){
                    let name = user.dataValues.name
                    let body = `<html><body>Hi ${name}, <br><br>Please click here to reset your password <a href="">Click here<></body></html>`
                    sendEmail(email, "Reset Password",body)
                    console.log('sent email')
                    res.status(200).jsonp({
                        status: 200,
                        data: {
                            msg: message.success
                        },
                       error: {}
                    });
                    return;
                }else{
                    res.status(400).jsonp({
                        status: 400,
                        data: {},
                        error: {
                            msg: message.user_not_found
                        }
                    });
                    return;
                }
            })
        }
    }).catch(function(err) {
        console.log('could not fetch user');
        console.log('err:', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong,
                err: err
            }
        });
        return;
    });

}