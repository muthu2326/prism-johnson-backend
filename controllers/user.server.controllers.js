/*Beans Copyright info*/

var Sequelize = require('sequelize');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;


var db = require('../db/connection/db');
var message = require('../utils/message.json');
var {
    checkDuplicateUser
} = require('../utils/db_helper')

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var UserModel = require('../models/init-models');
var User = UserModel.initModels(db).user

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create user record.*/
exports.createUser = function (req, res) {
    // Log entry.
    console.log('User Controller: entering createUser ');
    console.log('reqest body :: ', req.body)
    console.log('request paramas :: ', req.query)
    if (!req.body.email || !req.body.name || !req.body.lang || !req.body.role) {
        let response = {
            status: 400,
            data: {},
            error: {
                msg: message.missing_fields
            }
        }
        res.status(400).jsonp(response)
        return;
    }

    checkDuplicateUser(req.body.email.toLowerCase(), req.body.role.toLowerCase(), function (err, result) {
        if (err) {
            res.status(500).jsonp({
                status: 500,
                data: {},
                error: {
                    msg: message.something_went_wrong,
                    err: err
                }
            });
            return;
        } else if (!result.isDuplicate) {
            let NOW = new Date()
            let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.email.slice(0,5)}`)
            console.log('slug', slug)
            let lang = req.body.lang ? req.body.lang.toLowerCase() : 'en'

            // if password not provided by default setting email as the default password for admin, tte
            let password = bcrypt.hashSync(req.body.password ? req.body.password : req.body.email, saltRounds);
            console.log('password', password)

            User.create({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: password,
                address: req.body.address,
                mobile: req.body.mobile,
                pincode: req.body.pincode,
                stage_of_planning: req.body.stage_of_planning,
                role: req.body.role.toLowerCase(),
                slug: req.body.slug ? req.body.slug : slug,
                state_id: req.body.state_id,
                city_id: JSON.stringify(req.body.city_id),
                lang: lang,
                created: NOW,
                updated: NOW
            }).then(function (user) {
                console.log('created user', user);
                delete user.dataValues.password
                res.status(200).jsonp({
                    status: 200,
                    data: user,
                    error: {},
                });
                return;
            }).catch(function (err) {
                console.log('Could not create user record');
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
        } else if (result.isDuplicate) {
            console.log('Duplicate user: %j', req.body.email);
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.user_already_exist
                }
            });
            return;
        }
    })
} /*End of createUser*/

/*user registration record.*/
exports.userRegistration = function (req, res) {
    // Log entry.
    console.log('User Controller: entering userRegistration ');
    console.log('reqest body :: ', req.body)
    console.log('request paramas :: ', req.query)

    if (!req.body.email || !req.body.name || !req.body.lang || !req.body.role) {
        let response = {
            status: 400,
            data: {},
            error: {
                msg: message.missing_fields
            }
        }
        res.status(400).jsonp(response)
        return;
    }

    checkDuplicateUser(req.body.email.toLowerCase(), req.body.role.toLowerCase(), function (err, result) {
        if (err) {
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.something_went_wrong,
                    err: err
                }
            });
            return;
        } else if (!result.isDuplicate) {
            let NOW = new Date()
            let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.email.slice(0,5)}`)
            console.log('slug', slug)
            let lang = req.body.lang.toLowerCase();

            // if password not provided by default setting email as the default password for admin, tte
            let password = bcrypt.hashSync(req.body.password ? req.body.password : req.body.email, saltRounds);
            console.log('password', password)

            User.create({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: password.toString(),
                address: req.body.address,
                mobile: req.body.mobile,
                pincode: req.body.pincode,
                stage_of_planning: req.body.stage_of_planning,
                role: req.body.role.toLowerCase(),
                slug: req.body.slug ? req.body.slug : slug,
                state_id: req.body.state_id,
                city_id: JSON.stringify(req.body.city_id),
                lang: lang,
                created: NOW,
                updated: NOW
            }).then(function (user) {
                console.log('created user', user);
                delete user.dataValues.password
                res.status(200).jsonp({
                    status: 200,
                    data: user,
                    error: {},
                });
                return;
            }).catch(function (err) {
                console.log('Could not create user record');
                console.log('err: %j', err);
                res.status(500).jsonp({
                    status: 500,
                    data: {},
                    error: {
                        msg: message.something_went_wrong
                    }
                });
                return;
            });
        } else if (result.isDuplicate) {
            console.log('Duplicate user: %j', req.body.email);

            // sending existing data for user role 
            res.status(200).jsonp({
                status: 200,
                data: result.data,
                error: {
                    msg: message.user_already_exist
                }
            });
            return;
        }
    })
} /*End of userRegistration*/

/*Get a single user */
exports.getUser = function (req, res) {

    console.log('User Controller: entering getUser ', 'user_id', user_id);
    console.log('request paramas :: ', req.query)

    /*Validate for a null id*/
    if (!req.params.user_id) {
        console.log('missing user_id in params')
        res.status(400).jsonp({
            status: 400,
            data: {},
            message: message.invalid_get_request
        });
        return
    }

    var user_id = req.params.user_id;
    var lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';

    /* Query DB using sequelize api for a single user*/
    User.findOne({
        where: {
            id: user_id,
            lang: lang
        }
    }).then(function (user) {
        console.log(user);
        if (user != null) {
            delete user.dataValues.password
            res.status(200).jsonp({
                status: 200,
                data: user,
                error: {}
            });
            return;
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
    }).catch(function (err) {
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
        return
    });
} /*End of getUser*/

/*Get all Users */
exports.getAllUsers = function (req, res) {
    console.log('User Controller: entering getAllUsers');
    let lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';
    let role = req.query.role ? req.query.role.toLowerCase() : 'user';
    /* Query DB using sequelize api for all Users*/
    User.findAll({
            where: {
                lang: lang,
                role: role
            }
        })
        .then(function (users) {
            console.log('users', users)
            /*Return an array of Users */
            if (users.length > 0) {
                users.forEach(user => {
                    delete user.dataValues.password
                });
                res.status(200).jsonp({
                    status: 200,
                    data: users,
                    error: {}
                });
                return;
            } else {
                res.status(400).jsonp({
                    status: 400,
                    data: [],
                    error: {
                        msg: message.no_users_found
                    }
                });
                return;
            }
        }).catch(function (err) {
            console.log('could not fetch all users');
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
}; /*End of getAllUsers*/


/*Update user record.*/
exports.updateUser = function (req, res) {
    // Log entry.
    console.log('User Controller: entering updateUser ');
    console.log('reqest body :: ', req.body)
    console.log('reqest body :: ', req.params)

    if (!req.params.user_id) {
        console.log('missing user_id in params')
        res.status(400).jsonp({
            status: 400,
            data: {},
            message: message.invalid_get_request
        });
        return;
    }

    if (!req.body.email || !req.body.name || !req.body.role) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.missing_fields
            }
        })
        return;
    }

    var user_id = req.params.user_id;
    let NOW = new Date()
    let password;
    if (req.body.resetEmail) {
        checkDuplicateUser(req.body.email.toLowerCase(), req.body.role.toLowerCase(), function (err, result) {
            if (err) {
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.something_went_wrong,
                        err: err
                    }
                });
                return;
            }
            if (!result.isDuplicate) {
                console.log('inside dupcheck result false')
                password = bcrypt.hashSync(req.body.email, saltRounds);
                User.update({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: password,
                    address: req.body.address,
                    mobile: req.body.mobile,
                    pincode: req.body.pincode,
                    stage_of_planning: req.body.stage_of_planning,
                    role: req.body.role.toLowerCase(),
                    state_id: req.body.state_id,
                    city_id: JSON.stringify(req.body.city_id),
                    updated: NOW
                }, {
                    where: {
                        /* user table primary key */
                        id: user_id
                    }
                }).then(function (user) {
                    console.log('updated user', user);
                    if (user != null) {
                        res.status(200).jsonp({
                            status: 200,
                            data: {
                                msg: `${message.user_updated} ${req.params.user_id}`
                            },
                            error: {}
                        });
                        return;
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
                }).catch(function (err) {
                    console.log('Could not update user record');
                    console.log('err: %j', err);
                    res.status(500).jsonp({
                        status: 500,
                        data: {},
                        error: {
                            msg: message.something_went_wrong,
                            err: err
                        }
                    });
                });
            } else if (result.isDuplicate) {
                console.log('Duplicate user: %j', req.body.email);
                res.status(400).jsonp({
                    status: 400,
                    data: result.data,
                    error: {
                        msg: message.user_already_exist
                    }
                });
            }
        })
    } else {
        let NOW = new Date()
        User.update({
            name: req.body.name,
            address: req.body.address,
            mobile: req.body.mobile,
            password: result.data.password,
            pincode: req.body.pincode,
            stage_of_planning: req.body.stage_of_planning,
            role: req.body.role,
            state_id: req.body.state_id,
            city_id: JSON.stringify(req.body.city_id),
            updated: NOW
        }, {
            where: {
                /* user table primary key */
                id: user_id
            }
        }).then(function (user) {
            console.log('updated user', user);
            if (user != null) {
                res.status(200).jsonp({
                    status: 200,
                    data: {
                        msg: `${message.user_updated} ${req.params.user_id}`
                    },
                    error: {}
                });
            } else {
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: message.user_not_found
                    }
                });
            }
        }).catch(function (err) {
            console.log('Could not update user record');
            console.log('err: %j', err);
            res.status(500).jsonp({
                status: 500,
                data: {},
                error: {
                    msg: message.something_went_wrong,
                    err: err
                }
            });
        });
    }

} /*End of updateUser*/

/*Delete a single user */
exports.deleteUser = function (req, res) {
    console.log('User Controller: entering deleteUser ');

    console.log('reqest params :: ', req.params)

    /*Validate for a null user_id*/
    if (!req.params.user_id) {
        console.log('missing user_id in params')
        res.status(400).jsonp({
            status: 400,
            data: {},
            message: message.invalid_get_request
        });
        return;
    }

    var user_id = req.params.user_id;
    /* Delete user data */
    User.destroy({
        where: {
            id: user_id
        }
    }).then(function (user) {
        console.log(user);
        if (user != null) {
            res.status(200).jsonp({
                status: 200,
                data: {
                    msg: `${message.user_deleted} ${req.params.user_id}`
                },
                error: {}
            });
        } else {
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.user_not_found
                }
            });
        }
    }).catch(function (err) {
        console.log('could not delete user')
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: message.something_went_wrong,
                err: err
            }
        });
    });
} /*End of deleteUser*/


/*Get all Users for pagination */
exports.getAllUsersForPagination = function (req, res) {
    console.log('User Controller: entering getAllUsersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Users*/
    User.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (users) {
        /*Return an array of users */
        res.jsonp(users);
    }).catch(function (err) {
        console.log('could not fetch all users for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersForPagination*/

/*Get all sorted Users  */
exports.getAllUsersSortedByColumn = function (req, res) {
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
    }).then(function (users) {
        /*Return an array of Users */
        res.jsonp(users);
    }).catch(function (err) {
        console.log('could not fetch all Users for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersSortedByColumn*/

/*Get all filtered Users */
exports.getAllUsersFilteredByColumn = function (req, res) {
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
    User.findAll(criteria).then(function (users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function (err) {
        console.log('could not fetch all Users for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersFilteredByColumn*/


/*Get all Users by search text */
exports.getAllUsersBySearchText = function (req, res) {
    console.log('User Controller: entering getAllUsersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('name'), Sequelize.col('email'), Sequelize.col('password'), Sequelize.col('reset_pasword_link_sent'), Sequelize.col('address'), Sequelize.col('mobile'), Sequelize.col('pincode'), Sequelize.col('stage_of_planning'), Sequelize.col('role'), Sequelize.col('reference'), Sequelize.col('city_id'), Sequelize.col('lang'), Sequelize.col('created'), Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all users*/
    User.findAll(criteria).then(function (users) {
        /*Return an array of pages */
        res.jsonp(users);
    }).catch(function (err) {
        console.log('could not fetch all users for search');
        console.log('err: %j', err);
    });
}; /*End of getAllUsersBySearchText*/