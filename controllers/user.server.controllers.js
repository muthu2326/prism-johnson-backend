/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/db');

console.log('db', db)
/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

// var UserModel = require('../models/init-models');
// var User = UserModel.initModels(db)

var db1 = require('../models');
var User = db1.user

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create user record.*/
exports.createUser = function(req, res) {
    // Log entry.
    console.log('User Controller: entering createUser ');

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }
    let NOW = new Date()
    User.create({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				password : req.body.password,
				reset_pasword_link_sent : req.body.reset_pasword_link_sent,
				address : req.body.address,
				mobile : req.body.mobile,
				pincode : req.body.pincode,
				stage_of_planning : req.body.stage_of_planning,
				role : req.body.role,
                slug : req.body.slug,
                state_id: req.body.state_id,
				city_id : req.body.city_id,
				lang : req.body.lang,
				created : NOW,
				updated : NOW
    }).then(function(result) {
        console.log('created user', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create user record');
        console.log('err: %j', err);
    });

} /*End of createUser*/

/*user registration record.*/
exports.userRegistration = function(req, res) {
    // Log entry.
    console.log('User Controller: entering userRegistration ', req.body);

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }
    let NOW = new Date()
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        reset_pasword_link_sent : req.body.reset_pasword_link_sent,
        address : req.body.address,
        mobile : req.body.mobile,
        pincode : req.body.pincode,
        stage_of_planning : req.body.stage_of_planning,
        role : req.body.role,
        slug : req.body.slug,
        state_id: req.body.state_id,
        city_id : req.body.city_id,
        lang : req.body.lang,
        created : NOW,
        updated : NOW
    }).then(function(result) {
        console.log('created user', result);
       
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create user record');
        console.log('err: %j', err);
    });

} /*End of userRegistration*/

/*Get a single user */
exports.getUser = function(req, res) {
    var user_id = req.params.user_id;
    console.log('User Controller: entering getUser ');
    /*Validate for a null id*/
    if (!user_id) {
        res.status(400).send("user ID is null");
        return;
    }
    /* Query DB using sequelize api for a single user*/
    User.findOne({
        where: {
            id: user_id
        }
    }).then(function(user) {
        console.log(user);
        res.jsonp(user);
    }).catch(function(err) {
        console.log('could not fetch user');
        console.log('err: %j', err);
    });
} /*End of getUser*/

/*Get all Users */
exports.getAllUsers = function(req, res) {
    console.log('User Controller: entering getAllUsers');
    /* Query DB using sequelize api for all Users*/
    User.findAll().then(function(users) {
        /*Return an array of Users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users');
        console.log('err: %j', err);
    });
}; /*End of getAllUsers*/


/*Update user record.*/
exports.updateUser = function(req, res) {
    // Log entry.
    console.log('User Controller: entering updateUser ');

    var user_id = req.params.user_id;
    User.update({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				password : req.body.password,
				reset_pasword_link_sent : req.body.reset_pasword_link_sent,
				address : req.body.address,
				mobile : req.body.mobile,
				pincode : req.body.pincode,
				stage_of_planning : req.body.stage_of_planning,
				role : req.body.role,
                slug : req.body.slug,
                state_id: req.body.state_id,
				city_id : req.body.city_id,
				lang : req.body.lang,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* user table primary key */
            id: user_id
        }
    }).then(function(result) {
        console.log('updated user', result);
        res.send("user updated successfully");
    }).catch(function(err) {
        console.log('Could not update user record');
        console.log('err: %j', err);
    });

} /*End of updateUser*/

/*Delete a single user */
exports.deleteUser = function(req, res) {
    console.log('User Controller: entering deleteUser ');

    var user_id = req.params.user_id;
    /*Validate for a null user_id*/
    if (!user_id) {
        res.status(400).send("user ID is null");
        return;
    }
    /* Delete user record*/
    User.destroy({
        where: {
            id: user_id
        }
    }).then(function(user) {
        console.log(user);
        res.jsonp(user);
    }).catch(function(err) {
        console.log('could not delete user');
        console.log('err: %j', err);

    });
} /*End of deleteUser*/


/*Get all Users for pagination */
exports.getAllUsersForPagination = function(req, res) {
    console.log('User Controller: entering getAllUsersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Users*/
    User.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(users) {
        /*Return an array of users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersForPagination*/

/*Get all sorted Users  */
exports.getAllUsersSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllUsersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Users*/
    User.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(users) {
        /*Return an array of Users */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all Users for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersSortedByColumn*/

/*Get all filtered Users */
exports.getAllUsersFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllUsersFilteredByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var filterText = req.params.filterText;
    var offset = itemsPerPage * (pageNo - 1);
    var criteria = {};
    var whereCl = {};
    whereCl[colname] = filterText;

    criteria['where'] = whereCl;

    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
    User.findAll(criteria).then(function(users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all Users for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersFilteredByColumn*/


/*Get all Users by search text */
exports.getAllUsersBySearchText = function(req, res) {
    console.log('User Controller: entering getAllUsersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('name'),Sequelize.col('email'),Sequelize.col('password'),Sequelize.col('reset_pasword_link_sent'),Sequelize.col('address'),Sequelize.col('mobile'),Sequelize.col('pincode'),Sequelize.col('stage_of_planning'),Sequelize.col('role'),Sequelize.col('reference'),Sequelize.col('city_id'),Sequelize.col('lang'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all users*/
    User.findAll(criteria).then(function(users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function(err) {
        console.log('could not fetch all users for search');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersBySearchText*/