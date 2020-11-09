
var db = require('../db/connection/db');
const log = require('../utils/logger').get();

var UserModel = require('../models/init-models');
var User = UserModel.initModels(db).user

exports.checkDuplicateUser = (email, role, cb) => {
    console.log('inside checkDuplicateUser', email, role)
    User.findOne({
        where: {
            email: email,
            role: role
        }
    }).then(function(user) {
        log.info('Find User DB helper', JSON.stringify(user))
        console.log(user);
        if(user != null){
            console.log('found user')
            var data = {
                isDuplicate: true,
                data: user
            }
            log.info('Find User DB helper callback true', JSON.stringify(data))
            cb(null, data) // user exist with same email and role
            return;
        }else{
            var data = {
                isDuplicate: false,
                data: null
            }
            log.info('Find User DB helper callback false', JSON.stringify(data))
            cb(null, data) // new user
            return;
        }
    }).catch(function(err) {
        console.log('could not fetch user');
        console.log('err: %j', err);
        var data = {
            isDuplicate: false,
            data: null
        }
        log.info('Find User DB helper callback catch', JSON.stringify(err))
        cb(null, data) // new user
        return;
    });
}

exports.findUser = (user_id, role, cb) => {
    User.findOne({
        where: {
           id: user_id,
           role: role
        }
    }).then(function(user) {
        console.log(user);
        if(user != null){
            console.log('found user')
            cb(null, true)
        }else{
            cb(false, null)
        }
    }).catch(function(err) {
        console.log('could not fetch user');
        console.log('err: %j', err);
        cb(false, null) // new user
        return;
    });
}