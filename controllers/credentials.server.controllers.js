/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/db');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

// var CredentialModel = require('../models/init-models');
// var Credential = CredentialModel.initModels(db.getDbConnection())

var db1 = require('../models');
var Credential = db1.credentials

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create credentials record.*/
exports.createCredential = function(req, res) {
    // Log entry.
    console.log('Credential Controller: entering createCredential ');

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }

    Credential.create({
        id : req.body.id,
				type : req.body.type,
				field_name : req.body.field_name,
				value : req.body.value
    }).then(function(result) {
        console.log('created credentials', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create credentials record');
        console.log('err: %j', err);
    });

} /*End of createCredential*/


/*Get a single credentials */
exports.getCredential = function(req, res) {
    var credentials_id = req.params.credentials_id;
    console.log('Credential Controller: entering getCredential ');
    /*Validate for a null id*/
    if (!credentials_id) {
        res.status(400).send("credentials ID is null");
        return;
    }
    /* Query DB using sequelize api for a single credentials*/
    Credential.findOne({
        where: {
            id: credentials_id
        }
    }).then(function(credentials) {
        console.log(credentials);
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch credentials');
        console.log('err: %j', err);
    });
} /*End of getCredential*/

/*Get all Credentials */
exports.getAllCredentials = function(req, res) {
    console.log('Credential Controller: entering getAllCredentials');
    /* Query DB using sequelize api for all Credentials*/
    Credential.findAll().then(function(credentials) {
        /*Return an array of Credentials */
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch all credentials');
        console.log('err: %j', err);
    });
}; /*End of getAllCredentials*/


/*Update credentials record.*/
exports.updateCredential = function(req, res) {
    // Log entry.
    console.log('Credential Controller: entering updateCredential ');

    var credentials_id = req.params.credentials_id;
    Credential.update({
        id : req.body.id,
				type : req.body.type,
				field_name : req.body.field_name,
				value : req.body.value
    }, {
        where: {
            /* credentials table primary key */
            id: credentials_id
        }
    }).then(function(result) {
        console.log('updated credentials', result);
        res.send("credentials updated successfully");
    }).catch(function(err) {
        console.log('Could not update credentials record');
        console.log('err: %j', err);
    });

} /*End of updateCredential*/

/*Delete a single credential */
exports.deleteCredential = function(req, res) {
    console.log('Credential Controller: entering deleteCredential ');

    var credentials_id = req.params.credentials_id;
    /*Validate for a null credentials_id*/
    if (!credentials_id) {
        res.status(400).send("credentials ID is null");
        return;
    }
    /* Delete credentials record*/
    Credential.destroy({
        where: {
            id: credentials_id
        }
    }).then(function(credential) {
        console.log(credential);
        res.jsonp(credential);
    }).catch(function(err) {
        console.log('could not delete credential');
        console.log('err: %j', err);

    });
} /*End of deleteCredential*/


/*Get all Credentials for pagination */
exports.getAllCredentialsForPagination = function(req, res) {
    console.log('Credential Controller: entering getAllCredentialsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Credentials*/
    Credential.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(credentials) {
        /*Return an array of credentials */
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch all credentials for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllCredentialsForPagination*/

/*Get all sorted Credentials  */
exports.getAllCredentialsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllCredentialsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Credentials*/
    Credential.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(credentials) {
        /*Return an array of Credentials */
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch all Credentials for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllCredentialsSortedByColumn*/

/*Get all filtered Credentials */
exports.getAllCredentialsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllCredentialsFilteredByColumn');
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
    Credential.findAll(criteria).then(function(credentials) {
        /*Return an array of pages */
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch all Credentials for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllCredentialsFilteredByColumn*/


/*Get all Credentials by search text */
exports.getAllCredentialsBySearchText = function(req, res) {
    console.log('Credential Controller: entering getAllCredentialsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('type'),Sequelize.col('field_name'),Sequelize.col('value')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all credentials*/
    Credential.findAll(criteria).then(function(credentials) {
        /*Return an array of pages */
        res.jsonp(credentials);
    }).catch(function(err) {
        console.log('could not fetch all credentials for search');
        console.log('err: %j', err);
    });
}; /*End of getAllCredentialsBySearchText*/