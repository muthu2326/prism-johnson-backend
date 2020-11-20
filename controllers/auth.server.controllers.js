/*Beans Copyright info*/

const bcrypt = require('bcrypt');
const saltRounds = 10;
const {
    v4: uuidv4
} = require('uuid');

var db = require('../db/connection/db');
var message = require('../utils/message.json')
var {
    sendEmail
} = require('../utils/notification_helper')

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var UserModel = require('../models/init-models');
var User = UserModel.initModels(db).user

var DealerModel = require('../models/init-models');
var Dealer = DealerModel.initModels(db).dealer

var SessionModel = require('../models/init-models');
var Session = SessionModel.initModels(db).session

exports.login = function (req, res) {

    console.log('User Controller: entering Login ');
    console.log('request body :: ', req.body)

    /*Validate for a null email*/
    if (!req.body.email) {
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
    if (!req.body.password) {
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

    if (role != 'dealer') {
        User.findOne({
            where: {
                email: email,
                role: role
            }
        }).then(function (user) {
            if (user != null) {
                console.log(user.dataValues);
                let check_password = bcrypt.compareSync(req.body.password, user.password);
                console.log('check password', check_password)
                delete user.dataValues.password
                user.dataValues.cities = user.dataValues.city_id ? user.dataValues.city_id.split(",") : [];
                if (check_password) {
                    let NOW = new Date()
                    let currentDatetime = new Date()
                    let token = uuidv4(12);
                    let expiry = currentDatetime.setDate(currentDatetime.getDate() + 2)
                    let session = {
                        user_id: user.dataValues.id,
                        email: user.dataValues.email,
                        role: user.dataValues.role,
                        token: token,
                        exipry_date: expiry,
                        created: NOW,
                        updated: NOW
                    }
                    Session.create(session)
                        .then((session) => {
                            console.log('session created')
                            console.log(session.dataValues)
                            user.dataValues.token = session.dataValues.token
                            res.status(200).jsonp({
                                status: 200,
                                data: user,
                                message: message.success
                            });
                            return;
                        })
                        .catch(function (err) {
                            console.log('could not create session');
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
                        })
                } else {
                    res.status(400).jsonp({
                        status: 400,
                        data: {},
                        error: {
                            msg: message.invalid_login_credentials
                        }
                    });
                    return;
                }
            } else {
                console.log('no user found')
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.no_users_found
                    }
                });
                return;
            }
        }).catch(function (err) {
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
    } else {
        Dealer.findOne({
            where: {
                email: email
            }
        }).then(function (dealer) {
            if (dealer != null) {
                console.log(dealer);
                let check_password = bcrypt.compareSync(req.body.password, dealer.password);
                console.log('check password', check_password)
                delete dealer.dataValues.password;
                dealer.dataValues.role = `dealer`;
                let thisDealerCities = dealer.dataValues.cities;
                delete dealer.dataValues.cities;
                dealer.dataValues.cities = [];
                dealer.dataValues.cities.push(thisDealerCities);
                if (check_password) {
                    let NOW = new Date()
                    let currentDatetime = new Date()
                    let token = uuidv4(12);
                    let expiry = currentDatetime.setDate(currentDatetime.getDate() + 2)
                    let session = {
                        user_id: dealer.dataValues.id,
                        email: dealer.dataValues.email,
                        role: dealer.dataValues.role,
                        token: token,
                        exipry_date: expiry,
                        created: NOW,
                        updated: NOW
                    }
                    Session.create(session)
                        .then((session) => {
                            console.log('session created')
                            console.log(session.dataValues)
                            dealer.dataValues.token = session.dataValues.token
                            res.status(200).jsonp({
                                status: 200,
                                data: user,
                                message: message.success
                            });
                            return;
                        })
                        .catch(function (err) {
                            console.log('could not create session');
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
                        })
                    res.status(200).jsonp({
                        status: 200,
                        data: dealer,
                        message: message.success
                    });
                    return;
                } else {
                    res.status(400).jsonp({
                        status: 400,
                        data: {},
                        error: {
                            msg: message.invalid_login_credentials
                        }
                    });
                    return;
                }
            } else {
                console.log('no dealer found')
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.no_users_found
                    }
                });
                return;
            }

        }).catch(function (err) {
            console.log('could not fetch dealer');
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


exports.forgotPassword = function (req, res) {
    console.log('User Controller: forgotPassword ');
    console.log('request body :: ', req.body)

    if (!req.body.email) {
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
        }
    }).then(function (user) {
        if (user != null) {
            let name = user.dataValues.name
            let NOW = new Date()
            let currentDatetime = new Date()
            let token = uuidv4(12);
            let expiry = currentDatetime.setDate(currentDatetime.getHours() + 1)
            let session = {
                user_id: user.dataValues.id,
                email: user.dataValues.email,
                role: user.dataValues.role,
                token: token,
                exipry_date: expiry,
                created: NOW,
                updated: NOW
            }
            Session.create(session)
                .then((session) => {
                    console.log('session created')
                    console.log(session.dataValues)
                    let tokenValue = session.dataValues.token
                    let body = `<html><body>Hi ${name}, <br><br>Please click here to reset your password <a href="http://45.56.64.148:9192/auth/reset-pass?token=${tokenValue}">Click here</a><br><br>The link is valid for 1 hour</body></html>`
                    sendEmail(email, "Reset Password", body)
                    console.log('sent email')
                    res.status(200).jsonp({
                        status: 200,
                        data: {
                            msg: `Successfully sent reset password link to your email ${email}`
                        },
                        error: {}
                    });
                    return;
                })
                .catch(function (err) {
                    console.log('could not create session');
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
                })
        } else {
            Dealer.findOne({
                where: {
                    email: email
                }
            }).then(function (dealer) {
                console.log(dealer);
                if (dealer != null) {
                    let name = dealer.dataValues.name
                    let NOW = new Date()
                    let currentDatetime = new Date()
                    let token = uuidv4(12);
                    let expiry = currentDatetime.setDate(currentDatetime.getHours() + 1)
                    let session = {
                        user_id: dealer.dataValues.id,
                        email: dealer.dataValues.email,
                        role: dealer.dataValues.role,
                        token: token,
                        exipry_date: expiry,
                        created: NOW,
                        updated: NOW
                    }
                    Session.create(session)
                        .then((session) => {
                            console.log('session created')
                            console.log(session.dataValues)
                            let tokenValue = session.dataValues.token
                            let body = `<html><body>Hi ${name}, <br><br>Please click here to reset your password <a href="http://45.56.64.148:9192/auth/reset-pass?token=${tokenValue}">Click here</a><br><br>The link is valid for 1 hour</body></html>`
                            sendEmail(email, "Reset Password", body)
                            console.log('sent email')
                            res.status(200).jsonp({
                                status: 200,
                                data: {
                                    msg: `Successfully sent reset password link to your email ${email}`
                                },
                                error: {}
                            });
                            return;
                        })
                        .catch(function (err) {
                            console.log('could not create session');
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
                        })
                } else {
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
    }).catch(function (err) {
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


  
  
    // useEffect(() => {
    // const msg = firebase.messaging();
  
    //   msg
    //     .requestPermission()
    //     .then(() => {
    //       return msg.getToken();
    //     })
    //     .then((data) => {
    //       console.warn("token", data);
    //     });
    // });

exports.sendSinglenotification=function(token,topic){
    var registrationToken = token;
    var message = {
      webpush: {
        notification: {
          title:"New Message!",
          body:topic
        },
        fcm_options: {
          link:"https://zero1-477bf.firebaseapp.com/users/my-account"
        }
      },
      token: registrationToken
    };
  
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

exports.resetPassword = function (req, res) {
    console.log('User Controller: resetPassword ');
    console.log('request body :: ', req.body)
    console.log('request params :: ', req.params)
    console.log('request query :: ', req.query)

    let user_id = req.user_id;

    
}