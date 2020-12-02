/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
const fs = require('fs');
const csv = require('fast-csv');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var ServiceProviderModel = require('../models/init-models');
var ServiceProvider = ServiceProviderModel.initModels(db).service_providers
var message = require('../utils/message.json');

const SERVICE_PROVIDER_ROLES = {
    ARCHITECT : 'architect',
    ENGINEER : 'engineer',
    STRUCTURAL_ENGINEER : 'structural engineer',
    INTERIOR_DESINER : 'interior designer',
    VASTU_EXPERT : 'vastu expert',
    CONTRACTOR : 'contractor',
    MASON : 'mason'
}

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create service_providers record.*/
exports.createServiceProvider = function(req, res) {
    // Log entry.
    console.log('ServiceProvider Controller: entering createServiceProvider ');

    var v = new lib.Validator ("name:string,email:string,pin_code:string,state:string,district:string");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    ServiceProvider.create({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				mobile_number : req.body.mobile_number,
				address : req.body.address,
				pin_code : req.body.pin_code,
				state : req.body.state,
				district : req.body.district,
				region : req.body.region,
				branch : req.body.branch,
				territory : req.body.territory,
				tehsil : req.body.tehsil,
				firm_name : req.body.firm_name,
				office_phone_with_STD_code : req.body.office_phone_with_STD_code,
				roles : req.body.roles
    }).then(function(result) {
        console.log('created service_providers', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create service_providers record');
        console.log('err: %j', err);
    });

} /*End of createServiceProvider*/


/*Get a single service_providers */
exports.getServiceProvider = function(req, res) {
    var service_providers_id = req.params.service_providers_id;
    console.log('ServiceProvider Controller: entering getServiceProvider ');
    /*Validate for a null id*/
    if (!service_providers_id) {
        res.status(400).send("service_providers ID is null");
        return;
    }
    /* Query DB using sequelize api for a single service_providers*/
    ServiceProvider.findOne({
        where: {
            id: service_providers_id
        }
    }).then(function(service_providers) {
        console.log(service_providers);
        res.jsonp(service_providers);
    }).catch(function(err) {
        console.log('could not fetch service_providers');
        console.log('err: %j', err);
    });
} /*End of getServiceProvider*/

/*Get all ServiceProviders */
exports.getAllServiceProviders = function(req, res) {
    console.log('ServiceProvider Controller: entering getAllServiceProviders');
    /* Query DB using sequelize api for all ServiceProviders*/
    ServiceProvider.findAll().then(function(serviceProviders) {
        /*Return an array of ServiceProviders */
        res.jsonp(serviceProviders);
    }).catch(function(err) {
        console.log('could not fetch all serviceProviders');
        console.log('err: %j', err);
    });
}; /*End of getAllServiceProviders*/


/*Update service_providers record.*/
exports.updateServiceProvider = function(req, res) {
    // Log entry.
    console.log('ServiceProvider Controller: entering updateServiceProvider ');

    var service_providers_id = req.params.service_providers_id;
    ServiceProvider.update({
        id : req.body.id,
				name : req.body.name,
				email : req.body.email,
				mobile_number : req.body.mobile_number,
				address : req.body.address,
				pin_code : req.body.pin_code,
				state : req.body.state,
				district : req.body.district,
				region : req.body.region,
				branch : req.body.branch,
				territory : req.body.territory,
				tehsil : req.body.tehsil,
				firm_name : req.body.firm_name,
				office_phone_with_STD_code : req.body.office_phone_with_STD_code,
				roles : req.body.roles
    }, {
        where: {
            /* service_providers table primary key */
            id: service_providers_id
        }
    }).then(function(result) {
        console.log('updated service_providers', result);
        res.send("service_providers updated successfully");
    }).catch(function(err) {
        console.log('Could not update service_providers record');
        console.log('err: %j', err);
    });

} /*End of updateServiceProvider*/

/*Delete a single serviceProvider */
exports.deleteServiceProvider = function(req, res) {
    console.log('ServiceProvider Controller: entering deleteServiceProvider ');

    var service_providers_id = req.params.service_providers_id;
    /*Validate for a null service_providers_id*/
    if (!service_providers_id) {
        res.status(400).send("service_providers ID is null");
        return;
    }
    /* Delete service_providers record*/
    ServiceProvider.destroy({
        where: {
            id: service_providers_id
        }
    }).then(function(serviceProvider) {
        console.log(serviceProvider);
        res.jsonp(serviceProvider);
    }).catch(function(err) {
        console.log('could not delete serviceProvider');
        console.log('err: %j', err);

    });
} /*End of deleteServiceProvider*/


/*Get all ServiceProviders for pagination */
exports.getAllServiceProvidersForPagination = function(req, res) {
    console.log('ServiceProvider Controller: entering getAllServiceProvidersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ServiceProviders*/
    ServiceProvider.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(serviceProviders) {
        /*Return an array of serviceProviders */
        res.jsonp(serviceProviders);
    }).catch(function(err) {
        console.log('could not fetch all serviceProviders for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllServiceProvidersForPagination*/

/*Get all sorted ServiceProviders  */
exports.getAllServiceProvidersSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllServiceProvidersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ServiceProviders*/
    ServiceProvider.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(serviceProviders) {
        /*Return an array of ServiceProviders */
        res.jsonp(serviceProviders);
    }).catch(function(err) {
        console.log('could not fetch all ServiceProviders for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllServiceProvidersSortedByColumn*/

/*Get all filtered ServiceProviders */
exports.getAllServiceProvidersFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllServiceProvidersFilteredByColumn');
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
    ServiceProvider.findAll(criteria).then(function(serviceProviders) {
        /*Return an array of pages */
        res.jsonp(serviceProviders);
    }).catch(function(err) {
        console.log('could not fetch all ServiceProviders for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllServiceProvidersFilteredByColumn*/


/*Get all ServiceProviders by search text */
exports.getAllServiceProvidersBySearchText = function(req, res) {
    console.log('ServiceProvider Controller: entering getAllServiceProvidersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('name'),Sequelize.col('email'),Sequelize.col('mobile_number'),Sequelize.col('address'),Sequelize.col('pin_code'),Sequelize.col('state'),Sequelize.col('district'),Sequelize.col('region'),Sequelize.col('branch'),Sequelize.col('territory'),Sequelize.col('tehsil'),Sequelize.col('firm_name'),Sequelize.col('office_phone_with_STD_code'),Sequelize.col('roles')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all serviceProviders*/
    ServiceProvider.findAll(criteria).then(function(serviceProviders) {
        /*Return an array of pages */
        res.jsonp(serviceProviders);
    }).catch(function(err) {
        console.log('could not fetch all serviceProviders for search');
        console.log('err: %j', err);
    });
}; /*End of getAllServiceProvidersBySearchText*/


exports.importServiceProvidersDataCSV = function (req, res) {
    console.log('ServiceProviders Controller: entering importServiceProvidersDataCSV');
    let NOW = new Date();
    console.log('req.file', req.file)

    if (!req.file) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let service_providers_list = []

    fs.createReadStream(req.file.path)
        .pipe(csv.parse({
            headers: true
        }))
        .on("data", function (data) {
            console.log('csv data: service provider');
            console.log(data);

            //let slug = slugify(`${uuidv4().slice(4, 15)}`);
            //let password;
            let roles = [];
            data['Architect'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.ARCHITECT):'';
            data['Engineer'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.ENGINEER):'';
            data['Structural Engineer'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.STRUCTURAL_ENGINEER):'';
            data['Interior Designer'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.INTERIOR_DESINER):'';
            data['Vastu Expert'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.VASTU_EXPERT):'';
            data['Contractor'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.CONTRACTOR):'';
            data['Mason'].toLowerCase() === 'yes' ? roles.push(SERVICE_PROVIDER_ROLES.MASON):'';
            password = bcrypt.hashSync('service@123', saltRounds);

            let obj = {
                name : data['Technocrat Name'],
                email : data['Mail id'],
                mobile_number : data['Mobile Number'],
                address : data['Address'],
                pin_code : data['Pin Code'],
                state : data['State'],
                city : data['District'],
                region : data['Region'],
                branch : data['Branch'],
                territory : data['Territory'],
                tehsil : data['Tehsil'],
                firm_name : data['Firm Name'],
                office_phone_with_STD_code : data['Office Phone with STD Code'],
                roles : roles,
                created : NOW,
                updated : NOW
            }
            service_providers_list.push(obj)
        })
        .on("end", function () {
            console.log(`service_providers_list : ${JSON.stringify(service_providers_list)}`);
            fs.unlinkSync(req.file.path);
            if (service_providers_list.length > 0) {
                ServiceProvider.bulkCreate(service_providers_list, {
                        updateOnDuplicate: ["name", "email","mobile_number","address","pin_code","state","city","region","branch","territory","tehsil","firm_name","office_phone_with_STD_code","roles","updated"]
                    })
                    .then(function (serviceProvidersResponse) {
                        res.status(200).jsonp({
                            status: 200,
                            data: serviceProvidersResponse.length,
                            error: {}
                        });
                        console.log('serviceProvidersResponse created', serviceProvidersResponse.length)
                        // return;
                    }).catch((err) => {
                        console.log('Error in uploading service providers');
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
                        msg: `No service providers data found for creation`
                    }
                });
                return;
            }
        })
}

/*Get all ServiceProviders state & cities*/
exports.getAllServiceProvidersStateAndCities = function(req, res, callback) {
    console.log('ServiceProvider Controller: entering getAllServiceProviders');
    /* Query DB using sequelize api for all ServiceProviders*/
    ServiceProvider.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city'],'state'],
        order : ['state']
    }).then(function(serviceProviders) {
        /*Return an array of ServiceProviders */
        if(callback) {
            callback(null, serviceProviders);
        } else {
            res.jsonp(serviceProviders);
        }
        
    }).catch(function(err) {
        console.log('could not fetch all serviceProviders');
        console.log('err: %j', err);
        console.log(err);
        if(callback) {
            callback(err, null);
        }
    });
}; /*End of getAllServiceProviders*/
