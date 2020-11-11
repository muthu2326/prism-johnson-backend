/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');

// var BannerModel = require('../models/init-models');
// var Banner = BannerModel.initModels(db.getDbConnection())

var db1 = require('../models');
var Banner = db1.banner

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create banner record.*/
exports.createBanner = function(req, res) {
    // Log entry.
    console.log('Banner Controller: entering createBanner ');

    // var v = new lib.Validator [{"id:number");

    // if (!v.run(req.body)) {
    //     return res.status(400).send({
    //         error: v.errors
    //     });
    // }
    let NOW = new Date()
    Banner.create({
        id : req.body.id,
				media_type : req.body.media_type,
				title : req.body.title,
				description : req.body.description,
				media_url : req.body.media_url,
				slug : req.body.slug,
				lang : req.body.lang,
				created : NOW,
				updated : NOW
    }).then(function(result) {
        console.log('created banner', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create banner record');
        console.log('err: %j', err);
    });

} /*End of createBanner*/


/*Get a single banner */
exports.getBanner = function(req, res) {
    var banner_id = req.params.banner_id;
    console.log('Banner Controller: entering getBanner ');
    /*Validate for a null id*/
    if (!banner_id) {
        res.status(400).send("banner ID is null");
        return;
    }
    /* Query DB using sequelize api for a single banner*/
    Banner.findOne({
        where: {
            id: banner_id
        }
    }).then(function(banner) {
        console.log(banner);
        res.jsonp(banner);
    }).catch(function(err) {
        console.log('could not fetch banner');
        console.log('err: %j', err);
    });
} /*End of getBanner*/

/*Get all Banners */
exports.getAllBanners = function(req, res) {
    console.log('Banner Controller: entering getAllBanners');
    /* Query DB using sequelize api for all Banners*/
    Banner.findAll().then(function(banners) {
        /*Return an array of Banners */
        res.jsonp(banners);
    }).catch(function(err) {
        console.log('could not fetch all banners');
        console.log('err: %j', err);
    });
}; /*End of getAllBanners*/


/*Update banner record.*/
exports.updateBanner = function(req, res) {
    // Log entry.
    console.log('Banner Controller: entering updateBanner ');

    var banner_id = req.params.banner_id;
    Banner.update({
        id : req.body.id,
				media_type : req.body.media_type,
				title : req.body.title,
				description : req.body.description,
				media_url : req.body.media_url,
				slug : req.body.slug,
				lang : req.body.lang,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* banner table primary key */
            id: banner_id
        }
    }).then(function(result) {
        console.log('updated banner', result);
        res.send("banner updated successfully");
    }).catch(function(err) {
        console.log('Could not update banner record');
        console.log('err: %j', err);
    });

} /*End of updateBanner*/

/*Delete a single banner */
exports.deleteBanner = function(req, res) {
    console.log('Banner Controller: entering deleteBanner ');

    var banner_id = req.params.banner_id;
    /*Validate for a null banner_id*/
    if (!banner_id) {
        res.status(400).send("banner ID is null");
        return;
    }
    /* Delete banner record*/
    Banner.destroy({
        where: {
            id: banner_id
        }
    }).then(function(banner) {
        console.log(banner);
        res.jsonp(banner);
    }).catch(function(err) {
        console.log('could not delete banner');
        console.log('err: %j', err);

    });
} /*End of deleteBanner*/


/*Get all Banners for pagination */
exports.getAllBannersForPagination = function(req, res) {
    console.log('Banner Controller: entering getAllBannersForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Banners*/
    Banner.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(banners) {
        /*Return an array of banners */
        res.jsonp(banners);
    }).catch(function(err) {
        console.log('could not fetch all banners for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllBannersForPagination*/

/*Get all sorted Banners  */
exports.getAllBannersSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllBannersSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Banners*/
    Banner.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(banners) {
        /*Return an array of Banners */
        res.jsonp(banners);
    }).catch(function(err) {
        console.log('could not fetch all Banners for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllBannersSortedByColumn*/

/*Get all filtered Banners */
exports.getAllBannersFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllBannersFilteredByColumn');
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
    Banner.findAll(criteria).then(function(banners) {
        /*Return an array of pages */
        res.jsonp(banners);
    }).catch(function(err) {
        console.log('could not fetch all Banners for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllBannersFilteredByColumn*/


/*Get all Banners by search text */
exports.getAllBannersBySearchText = function(req, res) {
    console.log('Banner Controller: entering getAllBannersBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('media_type'),Sequelize.col('title'),Sequelize.col('description'),Sequelize.col('media_url'),Sequelize.col('slug'),Sequelize.col('lang'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all banners*/
    Banner.findAll(criteria).then(function(banners) {
        /*Return an array of pages */
        res.jsonp(banners);
    }).catch(function(err) {
        console.log('could not fetch all banners for search');
        console.log('err: %j', err);
    });
}; /*End of getAllBannersBySearchText*/