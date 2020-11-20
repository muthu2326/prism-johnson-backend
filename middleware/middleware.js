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
    let flag = true;
    if(flag){
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
        if(token == 'user-qwert'){
            console.log('user role no session validation is required')
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
    }else{
        console.log('skipping authentication')
        next()
    }
}

exports.authorizeAdmin = (req, res, next) => {
    console.log('middleware :: entering authorizeAdmin')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'admin'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeTTE = (req, res, next) => {
    console.log('middleware :: entering authorizeTTE')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'tte'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeDealer = (req, res, next) => {
    console.log('middleware :: entering authorizeDealer')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'dealer'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeAll = (req, res, next) => {
    console.log('middleware :: entering authorizeAll')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'admin' || role == 'tte' || role == 'dealer'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeAdminTTE = (req, res, next) => {
    console.log('middleware :: entering authorizeAdminTTE')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'admin' || role == 'tte'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeAdminDealer = (req, res, next) => {
    console.log('middleware :: entering authorizeAdminDealer')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'admin' || role == 'dealer'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}

exports.authorizeTTEDealer = (req, res, next) => {
    console.log('middleware :: entering authorizeTTEDealer')
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

    Session.findOne({
        where: {
            token: token
        }
    })
    .then((session) => {
        if(session != null){
            console.log('session found')
            console.log('autorize admin')
            let role = session.dataValues.role
            console.log('role found :: ', role)
            if(role == 'tte' || role == 'dealer'){
                console.log('user is authorized, role :: ', role)
                next()
            }else{
                res.status(403).jsonp({
                    status: 403,
                    data: {},
                    error: {
                        msg: message.forbidden
                    }
                });
                return;
            }
        }else{
            res.status(403).jsonp({
                status: 403,
                data: {},
                error: {
                    msg: message.forbidden
                }
            });
            return;
        }
    })
}



