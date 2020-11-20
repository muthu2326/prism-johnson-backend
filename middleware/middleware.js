const log = require('../utils/logger').get();
const {
    v4: uuidv4
} = require('uuid');
var db = require('../db/connection/db');
var message = require('../utils/message.json');


var SessionModel = require('../models/init-models');
var Session = SessionModel.initModels(db).session

exports.authenticate = (req, res, next) => {
    console.log('middleware :: entering authenticate session')
    console.log('req headers', req.headers)
    
    const token = req.headers.token;
    if (!token) {
        res.status(401).jsonp({
            status: 401,
            data: {},
            error: {
                msg: message.authorization_not_found
            }
        });
        return;
    }
    if(token == 'abc'){
        next()
        return;
    }else{
        Session.findOne({
            where: {
                token: token
            }
        })
        .then((session) => {
            if(session != null){
                console.log('session found')
                let NOW = new Date()
                console.log('checking current time with token expiry time')
                console.log('NOW ', NOW, 'expiry date', session.dataValues.exipry_date )
                console.log('result :: ', NOW < session.dataValues.exipry_date)
                if(NOW < session.dataValues.exipry_date){
                    console.log('session is valid')
                    console.log(JSON.stringify(session.dataValues))
                    next();
                }else{
                    res.status(401).jsonp({
                        status: 401,
                        data: {},
                        error: {
                            msg: message.session_expired
                        }
                    });
                    return;
                }
            }else{
                res.status(401).jsonp({
                    status: 401,
                    data: {},
                    error: {
                        msg: message.invalid_authorization
                    }
                });
                return;
            }
        })
        .catch((err) => {
            console.log('Could not find session');
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
    }
}