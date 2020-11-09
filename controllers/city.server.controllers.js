/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
var message = require('../utils/message.json');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var CityModel = require('../models/init-models');
var City = CityModel.initModels(db).city

var StateModel = require('../models/init-models');
var State = StateModel.initModels(db).state

// City.belongsTo(State);
// db.user.belongsTo(db.city_master, {foreignKey: 'city_id'});
City.belongsTo(State, {foreignKey: 'state_id'});

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create city record.*/
exports.createCity = function (req, res) {
    // Log entry.
    console.log('City Controller: entering createCity ');

    let slug = slugify(`${uuidv4().slice(4, 12)} ${req.body.name.slice(0,5)}`)
    let NOW = new Date()

    City.create({
        name: req.body.name,
        lang: req.body.lang,
        slug: slug,
        state_id: req.body.state_id,
        created: NOW,
        updated: NOW
    }).then(function (result) {
        console.log('created city', result);
        res.jsonp(result);
    }).catch(function (err) {
        console.log('Could not create city record');
        console.log('err: %j', err);
    });

} /*End of createCity*/


/*Get a single city */
exports.getCity = function (req, res) {
    var city_id = req.params.city_id;
    console.log('City Controller: entering getCity ');
    /*Validate for a null id*/
    if (!city_id) {
        res.status(400).send("city ID is null");
        return;
    }
    /* Query DB using sequelize api for a single city*/
    City.findOne({
        where: {
            id: city_id
        }
    }).then(function (city) {
        console.log(city);
        res.jsonp(city);
    }).catch(function (err) {
        console.log('could not fetch city');
        console.log('err: %j', err);
    });
} /*End of getCity*/

/*Get all Cities */
exports.getAllCities = function (req, res) {
    console.log('City Controller: entering getAllCities');
    /* Query DB using sequelize api for all Cities*/
    City.findAll({
        include: State
    }).then(function (cities) {
        /*Return an array of Cities */
        if (cities.length > 0) {
            res.status(200).jsonp({
                status: 200,
                data: cities,
                error: {}
            });
            return;
        } else {
            res.status(400).jsonp({
                status: 400,
                data: [],
                error: {
                    msg: message.no_cities_found
                }
            });
            return;
        }
    }).catch(function (err) {
        console.log('could not fetch all cities');
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
}; /*End of getAllCities*/


/*Update city record.*/
exports.updateCity = function (req, res) {
    // Log entry.
    console.log('City Controller: entering updateCity ');

    var city_id = req.params.city_id;
    let NOW = new Date()

    City.update({
        id: req.body.id,
        name: req.body.name,
        lang: req.body.lang,
        slug: req.body.slug,
        state_id: req.body.state_id,
        updated: NOW
    }, {
        where: {
            /* city table primary key */
            id: city_id
        }
    }).then(function (result) {
        console.log('updated city', result);
        res.send("city updated successfully");
    }).catch(function (err) {
        console.log('Could not update city record');
        console.log('err: %j', err);
    });

} /*End of updateCity*/

/*Delete a single city */
exports.deleteCity = function (req, res) {
    console.log('City Controller: entering deleteCity ');

    var city_id = req.params.city_id;
    /*Validate for a null city_id*/
    if (!city_id) {
        res.status(400).send("city ID is null");
        return;
    }
    /* Delete city record*/
    City.destroy({
        where: {
            id: city_id
        }
    }).then(function (city) {
        console.log(city);
        res.jsonp(city);
    }).catch(function (err) {
        console.log('could not delete city');
        console.log('err: %j', err);

    });
} /*End of deleteCity*/


/*Get all Cities for pagination */
exports.getAllCitiesForPagination = function (req, res) {
    console.log('City Controller: entering getAllCitiesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Cities*/
    City.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (cities) {
        /*Return an array of cities */
        res.jsonp(cities);
    }).catch(function (err) {
        console.log('could not fetch all cities for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllCitiesForPagination*/

/*Get all sorted Cities  */
exports.getAllCitiesSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllCitiesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Cities*/
    City.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (cities) {
        /*Return an array of Cities */
        res.jsonp(cities);
    }).catch(function (err) {
        console.log('could not fetch all Cities for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllCitiesSortedByColumn*/

/*Get all filtered Cities */
exports.getAllCitiesFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllCitiesFilteredByColumn');
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
    City.findAll(criteria).then(function (cities) {
        /*Return an array of pages */
        res.jsonp(cities);
    }).catch(function (err) {
        console.log('could not fetch all Cities for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllCitiesFilteredByColumn*/


/*Get all Cities by search text */
exports.getAllCitiesBySearchText = function (req, res) {
    console.log('City Controller: entering getAllCitiesBySearchText');
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

    /* Query DB using sequelize api for all cities*/
    City.findAll(criteria).then(function (cities) {
        /*Return an array of pages */
        res.jsonp(cities);
    }).catch(function (err) {
        console.log('could not fetch all cities for search');
        console.log('err: %j', err);
    });
}; /*End of getAllCitiesBySearchText*/