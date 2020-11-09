
var db = require('../db/connection/db');

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
        console.log(user);
        if(user != null){
            console.log('found user')
            var data = {
                isDuplicate: true,
                data: user
            }
            cb(null, data) // user exist with same email and role
            return;
        }else{
            var data = {
                isDuplicate: false,
                data: null
            }
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
        cb(null, data) // new user
        return;
    });
}