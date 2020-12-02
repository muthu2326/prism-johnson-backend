/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
var message = require('../utils/message.json');
/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */
var ServiceProviderController = require('./service_providers.server.controllers');
var StateModel = require('../models/init-models');
var State = StateModel.initModels(db).state

var CityModel = require('../models/init-models');
var City = CityModel.initModels(db).city

State.hasMany(City, {foreignKey: 'state_id'});

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create State record.*/
exports.createState = function (req, res) {
    // Log entry.
    console.log('State Controller: entering createState ');
    let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.name.slice(0,5)}`)
    let NOW = new Date()

    State.create({
        name: req.body.name,
        lang: req.body.lang,
        slug: slug,
        created: NOW,
        updated: NOW
    }).then(function (result) {
        console.log('created State', result);
        res.status(200).jsonp({
            status: 200,
            data: result,
            error: {}
        });
        return;
    }).catch(function (err) {
        console.log('Could not create State record');
        console.log('err: %j', err);
    });

} /*End of createState*/


/*Get a single State */
exports.getState = function (req, res) {
    var state_id = req.params.state_id;
    console.log('State Controller: entering getState ');
    /*Validate for a null id*/
    if (!state_id) {
        res.status(400).send("State ID is null");
        return;
    }
    /* Query DB using sequelize api for a single State*/
    State.findOne({
        where: {
            id: state_id
        }
    }).then(function (state) {
        console.log(state);
        res.jsonp(state);
    }).catch(function (err) {
        console.log('could not fetch State');
        console.log('err: %j', err);
    });
} /*End of getState*/

/*Get all states */
exports.getAllStates = function (req, res) {
    console.log('State Controller: entering getAllStates');
    /* Query DB using sequelize api for all states*/
    if(req.query.type === 'serviceproviders') {
        ServiceProviderController.getAllServiceProvidersStateAndCities(req, res, (error, result) => {
            if(error) {
                res.status(500).send(error);
            } else {
                let apiResponse = {};
                apiResponse.status = 200;
                apiResponse.data = result;
                res.send(apiResponse);
            }
        })
    } else {
        State.findAll({
            include: City
        }).then(function (states) {
            /*Return an array of states */
            if (states.length > 0) {
                res.status(200).jsonp({
                    status: 200,
                    data: states,
                    error: {}
                });
                return;
            } else {
                res.status(400).jsonp({
                    status: 400,
                    data: [],
                    error: {
                        msg: message.no_states_found
                    }
                });
                return;
            }
        }).catch(function (err) {
            console.log('could not fetch all states');
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
    }
}; /*End of getAllStates*/


/*Update State record.*/
exports.updateState = function (req, res) {
    // Log entry.
    console.log('State Controller: entering updateState ');

    var State_id = req.params.State_id;
    State.update({
        id: req.body.id,
        name: req.body.name,
        lang: req.body.lang,
        slug: req.body.slug,
        updated: NOW
    }, {
        where: {
            /* State table primary key */
            id: State_id
        }
    }).then(function (result) {
        console.log('updated State', result);
        res.send("State updated successfully");
    }).catch(function (err) {
        console.log('Could not update State record');
        console.log('err: %j', err);
    });

} /*End of updateState*/

/*Delete a single State */
exports.deleteState = function (req, res) {
    console.log('State Controller: entering deleteState ');

    var state_id = req.params.state_id;
    /*Validate for a null state_id*/
    if (!state_id) {
        res.status(400).send("State ID is null");
        return;
    }
    /* Delete State record*/
    State.destroy({
        where: {
            id: state_id
        }
    }).then(function (State) {
        console.log(State);
        res.jsonp(State);
    }).catch(function (err) {
        console.log('could not delete State');
        console.log('err: %j', err);

    });
} /*End of deleteState*/


/*Get all states for pagination */
exports.getAllStatesForPagination = function (req, res) {
    console.log('State Controller: entering getAllStatesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all states*/
    State.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (states) {
        /*Return an array of states */
        res.jsonp(states);
    }).catch(function (err) {
        console.log('could not fetch all states for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllStatesForPagination*/

/*Get all sorted states  */
exports.getAllStatesSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllStatesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all states*/
    State.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (states) {
        /*Return an array of states */
        res.jsonp(states);
    }).catch(function (err) {
        console.log('could not fetch all states for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllStatesSortedByColumn*/

/*Get all filtered states */
exports.getAllStatesFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllStatesFilteredByColumn');
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
    State.findAll(criteria).then(function (states) {
        /*Return an array of pages */
        res.jsonp(states);
    }).catch(function (err) {
        console.log('could not fetch all states for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllStatesFilteredByColumn*/


/*Get all states by search text */
exports.getAllStatesBySearchText = function (req, res) {
    console.log('State Controller: entering getAllStatesBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('name'), Sequelize.col('lang'), Sequelize.col('slug'), Sequelize.col('state_id'), Sequelize.col('created'), Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all states*/
    State.findAll(criteria).then(function (states) {
        /*Return an array of pages */
        res.jsonp(states);
    }).catch(function (err) {
        console.log('could not fetch all states for search');
        console.log('err: %j', err);
    });
}; /*End of getAllStatesBySearchText*/