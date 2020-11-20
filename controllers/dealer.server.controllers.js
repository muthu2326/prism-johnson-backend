/*Beans Copyright info*/
const log = require('../utils/logger').get();
var Sequelize = require('sequelize');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
var db = require('../db/connection/db');
var message = require('../utils/message.json');
const fs = require('fs');
const csv = require('fast-csv');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var DealerModel = require('../models/init-models');
var Dealer = DealerModel.initModels(db).dealer
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create dealer record.*/
exports.createDealer = function(req, res) {
    // Log entry.
    console.log('Dealer Controller: entering createDealer ');

    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)
    let NOW = new Date()
    let slug = slugify(`${uuidv4().slice(4, 15)}`)
    let password;
    if(req.body.email){
        password = bcrypt.hashSync(req.body.password ? req.body.password : req.body.email, saltRounds);
    }else{
        password = bcrypt.hashSync(req.body.password ? req.body.password : req.body.mobile, saltRounds);   
    }

    Dealer.create({
        region : req.body.region,
        branch : req.body.branch,
        territory : req.body.territory,
        dealer_code : req.body.dealer_code,
        name : req.body.name,
        state: req.body.state,
        pincode : req.body.pincode,
        address : req.body.address,
        email : req.body.email,
        password : password,
        reset_pasword_link_sent : req.body.reset_pasword_link_sent,
        lang : req.body.lang,
        slug : req.body.slug ? req.body.slug : slug,
        created : NOW,
        updated : NOW,
        contact_no : req.body.contact_no,
        cities : req.body.cities,
        state : req.body.state
    }).then(function(result) {
        console.log('created dealer', result);
            res.status(200).jsonp({
                status: 200,
                data: result,
                error: {},
            });
            return;
    }).catch(function(err) {
        console.log('Could not create dealer record');
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

} /*End of createDealer*/


/*Get a single dealer */
exports.getDealer = function(req, res) {
    console.log('Dealer Controller: entering getDealer ');
    var dealer_id = req.params.dealer_id;

    if (!dealer_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }
    /*Validate for a null id*/
    /* Query DB using sequelize api for a single dealer*/
    let lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';
    Dealer.findOne({
        where: {
            id: dealer_id,
            lang: lang
        }
    }).then(function(dealer) {
        console.log(dealer);
        res.status(200).jsonp({
            status: 200,
            data: dealer != null ? dealer : {},
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('could not fetch dealer');
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
} /*End of getDealer*/

/*Get all Dealers */
exports.getAllDealers = function(req, res) {
    console.log('Dealer Controller: entering getAllDealers');
    let lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';
    /* Query DB using sequelize api for all Dealers*/
    Dealer.findAll({
        where: {
            lang: lang
        }
    }).then(function(dealers) {
        /*Return an array of Dealers */
        if (dealers.length > 0) {
            dealers.forEach(dealer => {
                delete dealer.dataValues.password
            });
            res.status(200).jsonp({
                status: 200,
                data: dealers,
                error: {}
            });
            return;
        } else {
            res.status(200).jsonp({
                status: 200,
                data: [],
                error: {
                    msg: message.no_dealers_found
                }
            });
            return;
        }
    }).catch(function(err) {
        console.log('could not fetch all dealers');
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
}; /*End of getAllDealers*/

exports.importDealersDataCSV = function (req, res) {
    console.log('Dealer Controller: entering importDealersDataCSV');
    let NOW = new Date()
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

    console.log('llllllllllllllllll')
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({
            headers: false
        }))
    .on("data", function (data) {
        console.log('csv data: dealer')
        console.log(data)
    })
    .on("end", function () {
        fs.unlinkSync(req.file.path);
        console.log('eeeeeeeeeeeeeeeee')
        Dealer.findAll().then(function(dealers) {
            /*Return an array of Dealers */
            if (dealers.length > 0) {
                res.status(200).jsonp({
                    status: 200,
                    data: {
                        msg: `Successfully created ${dealers.length} records`
                    },
                    error: {}
                });
                return;
            } else {
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: `No dealers data found for creation`
                    }
                });
                return;
            }
        }).catch(function(err) {
            console.log('could not fetch all dealers');
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
    })
}

exports.dealerLocator = function(req, res) {
    console.log('Dealer Controller: entering dealerLocator');
    console.log('req.query', req.query)
    log.info(`req.body, req.params, req.query ${JSON.stringify(req.query)}`)
    let lang = req.query.lang ? req.query.lang.toLowerCase() : 'en';
    let state = req.query.state
    let city = req.query.city
    let pincode = req.query.pincode
    /* Query DB using sequelize api for all Dealers*/
    let where_condition;

    if(pincode){
        where_condition = {
            lang: lang,
            pincode: pincode
        }
    }else if(state != null && city != null){
        where_condition = {
            lang: lang,
            state: state,
            cities: city
        }
    }else{
        where_condition = {
            lang: lang
        }
    }

    console.log('where_condition', where_condition)
    log.info(`req.body, req.params, req.query ${JSON.stringify(where_condition)}`)

    Dealer.findAll({
        where: where_condition
    }).then(function(dealers) {
        /*Return an array of Dealers */
        if (dealers.length > 0) {
            dealers.forEach(dealer => {
                delete dealer.dataValues.password
            });
            res.status(200).jsonp({
                status: 200,
                data: dealers,
                error: {}
            });
            return;
        } else {
            res.status(200).jsonp({
                status: 200,
                data: [],
                error: {
                    msg: message.no_dealers_found
                }
            });
            return;
        }
    }).catch(function(err) {
        console.log('could not fetch all dealers');
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
}; /*End of getAllDealers*/

/*Update dealer record.*/
exports.updateDealer = function(req, res) {
    // Log entry.
    console.log('Dealer Controller: entering updateDealer ');

    var dealer_id = req.params.dealer_id;

    if (!dealer_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let NOW = new Date()

    Dealer.update({
        region : req.body.region,
        branch : req.body.branch,
        territory : req.body.territory,
        dealer_code : req.body.dealer_code,
        name : req.body.name,
        pincode : req.body.pincode,
        address : req.body.address,
        email : req.body.email,
        lang : req.body.lang,
        updated : NOW,
        contact_no : req.body.contact_no,
        cities : req.body.cities,
        state : req.body.state
    }, {
        where: {
            /* dealer table primary key */
            id: dealer_id
        }
    }).then(function(result) {
        console.log('updated dealer', result);
        if(result != 0){         
            res.status(200).jsonp({
                status: 200,
                data: {
                    msg: "successfully updated dealer " + dealer_id
                },
                error: {}
            });
            return;
        }else{
            res.status(200).jsonp({
                status: 200,
                data: {},
                error: {
                    msg: "Dealer not found for " + dealer_id
                }
            });
            return;
        }
    }).catch(function(err) {
        console.log('Could not update dealer record');
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

} /*End of updateDealer*/

/*Delete a single dealer */
exports.deleteDealer = function(req, res) {
    console.log('Dealer Controller: entering deleteDealer ');

    var dealer_id = req.params.dealer_id;
    /*Validate for a null dealer_id*/
     if (!dealer_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }
    /* Delete dealer record*/
    Dealer.destroy({
        where: {
            id: dealer_id
        }
    }).then(function(dealer) {
        console.log(dealer);
        res.status(200).jsonp({
            status: 200,
            data: {
                msg: "successfully removed dealer " + dealer_id
            },
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('could not delete dealer');
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
} /*End of deleteDealer*/


/*Get all Dealers for pagination */
exports.getAllDealersForPagination = function(req, res) {
    console.log('Dealer Controller: entering getAllDealersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Dealers*/
    Dealer.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(dealers) {
        /*Return an array of dealers */
        res.jsonp(dealers);
    }).catch(function(err) {
        console.log('could not fetch all dealers for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllDealersForPagination*/

/*Get all sorted Dealers  */
exports.getAllDealersSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllDealersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Dealers*/
    Dealer.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(dealers) {
        /*Return an array of Dealers */
        res.jsonp(dealers);
    }).catch(function(err) {
        console.log('could not fetch all Dealers for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllDealersSortedByColumn*/

/*Get all filtered Dealers */
exports.getAllDealersFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllDealersFilteredByColumn');
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
    Dealer.findAll(criteria).then(function(dealers) {
        /*Return an array of pages */
        res.jsonp(dealers);
    }).catch(function(err) {
        console.log('could not fetch all Dealers for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllDealersFilteredByColumn*/


/*Get all Dealers by search text */
exports.getAllDealersBySearchText = function(req, res) {
    console.log('Dealer Controller: entering getAllDealersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('region'),Sequelize.col('branch'),Sequelize.col('territory'),Sequelize.col('dealer_code'),Sequelize.col('name'),Sequelize.col('pincode'),Sequelize.col('address'),Sequelize.col('email'),Sequelize.col('password'),Sequelize.col('reset_pasword_link_sent'),Sequelize.col('lang'),Sequelize.col('slug'),Sequelize.col('created'),Sequelize.col('updated'),Sequelize.col('contact_no'),Sequelize.col('cities'),Sequelize.col('state')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all dealers*/
    Dealer.findAll(criteria).then(function(dealers) {
        /*Return an array of pages */
        res.jsonp(dealers);
    }).catch(function(err) {
        console.log('could not fetch all dealers for search');
        console.log('err: %j', err);
    });
}; /*End of getAllDealersBySearchText*/