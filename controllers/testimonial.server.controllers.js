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

var TestimonialModel = require('../models/init-models');
var Testimonial = TestimonialModel.initModels(db).testimonial

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create testimonial record.*/
exports.createTestimonial = function(req, res) {
    // Log entry.
    console.log('Testimonial Controller: entering createTestimonial ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let NOW = new Date()
    let slug = slugify(`${uuidv4().slice(4, 12)}`)
    let lang = req.body.lang ? req.body.lang : 'en'

    Testimonial.create({
        name : req.body.name,
        media_url : req.body.media_url,
        media_type : req.body.media_type,
        profession : req.body.profession,
        testimonial : req.body.testimonial,
        avatar_img_url: req.body.avatar_img_url,
        display_in_home_page: req.body.display_in_home_page ? req.body.display_in_home_page : 0,
        email : req.body.email,
        mobile : req.body.mobile,
        slug: req.body.slug ? req.body.slug : slug,
        lang: lang,
        created : NOW,
        updated : NOW
    }).then(function(result) {
        console.log('created testimonial', result);
        res.jsonp({
            status: 200,
            data: result,
            error: {}
        });
        return;
    }).catch(function(err) {
        console.log('Could not create testimonial record');
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

} /*End of createTestimonial*/


/*Get a single testimonial */
exports.getTestimonial = function(req, res) {
    var slug = req.params.slug;
    console.log('Testimonial Controller: entering getTestimonial ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    /*Validate for a null id*/
    if (!slug) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    if (!req.query.lang) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    /* Query DB using sequelize api for a single testimonial*/
    let lang = req.query.lang

    Testimonial.findOne({
        where: {
            slug: slug,
            lang: lang
        }
    }).then(function(testimonial) {
        console.log(testimonial);
        if (testimonial != null) {
            res.status(200).jsonp({
                status: 200,
                data: testimonial,
                error: {}
            });
            return;
        } else{
            res.status(200).jsonp({
                status: 200,
                data: {},
                error: {}
            });
            return
        }
    }).catch(function(err) {
        console.log('could not fetch testimonial');
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
} /*End of getTestimonial*/

/*Get all Testimonials */
exports.getAllTestimonials = function(req, res) {
    console.log('Testimonial Controller: entering getAllTestimonials');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    /* Query DB using sequelize api for all Testimonials*/

    if (!req.query.lang) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let lang = req.query.lang

    Testimonial.findAll({
        lang: lang
    }).then(function(testimonials) {
        /*Return an array of Testimonials */
        if (testimonials.length > 0) {
            res.status(200).jsonp({
                status: 200,
                data: testimonials,
                error: {}
            });
            return;
        } else{
            res.status(200).jsonp({
                status: 200,
                data: [],
                error: {}
            });
            return
        }
    }).catch(function(err) {
        console.log('could not fetch all testimonials');
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
}; /*End of getAllTestimonials*/


/*Update testimonial record.*/
exports.updateTestimonial = function(req, res) {
    // Log entry.
    console.log('Testimonial Controller: entering updateTestimonial ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    var testimonial_id = req.params.testimonial_id;

    if (!testimonial_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    if (!req.query.lang) {
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
    let lang = req.query.lang

    Testimonial.update({
        name : req.body.name,
        media_url : req.body.media_url,
        media_type : req.body.media_type,
        avatar_img_url: req.body.avatar_img_url,
        display_in_home_page: req.body.display_in_home_page,
        profession : req.body.profession,
        testimonial : req.body.testimonial,
        email : req.body.email,
        lang: lang,
        mobile : req.body.mobile,
        updated : NOW
    }, {
        where: {
            /* testimonial table primary key */
            id: testimonial_id,
            lang: lang
        }
    }).then(function(result) {
        console.log('updated testimonial', result);
          res.status(200).jsonp({
                status: 200,
                data: {
                    msg: `${message.testimonial_updated} ${req.params.testimonial_id}`,
                },
                error: {}
            });
            return;
    }).catch(function(err) {
        console.log('Could not update testimonial record');
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

} /*End of updateTestimonial*/

/*Delete a single testimonial */
exports.deleteTestimonial = function(req, res) {
    console.log('Testimonial Controller: entering deleteTestimonial ');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    /*Validate for a null testimonial_id*/
  
    var testimonial_id = req.params.testimonial_id;
    if (!testimonial_id) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    if (!req.query.lang) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let lang = req.query.lang

    /* Delete testimonial record*/
    Testimonial.destroy({
        where: {
            id: testimonial_id,
            lang: lang
        }
    }).then(function(testimonial) {
        console.log(testimonial);
        if(testimonial != 0){
            res.status(200).jsonp({
                status: 200,
                data: {
                    msg: `${message.testimonial_updated} ${req.params.testimonial_id}`,
                },
                error: {}
            });
            return;
          }else{
            res.status(200).jsonp({
                status: 200,
                data: {},
                error: {
                    msg: `${message.testimonial_not_found}`,
                }
            });
            return;
          }
    }).catch(function(err) {
        console.log('could not delete testimonial');
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
} /*End of deleteTestimonial*/


/*Get all Testimonials for pagination */
exports.getAllTestimonialsForPagination = function(req, res) {
    console.log('Testimonial Controller: entering getAllTestimonialsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Testimonials*/
    Testimonial.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(testimonials) {
        /*Return an array of testimonials */
        res.jsonp(testimonials);
    }).catch(function(err) {
        console.log('could not fetch all testimonials for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllTestimonialsForPagination*/

/*Get all sorted Testimonials  */
exports.getAllTestimonialsSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllTestimonialsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Testimonials*/
    Testimonial.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(testimonials) {
        /*Return an array of Testimonials */
        res.jsonp(testimonials);
    }).catch(function(err) {
        console.log('could not fetch all Testimonials for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllTestimonialsSortedByColumn*/

/*Get all filtered Testimonials */
exports.getAllTestimonialsFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllTestimonialsFilteredByColumn');
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
    Testimonial.findAll(criteria).then(function(testimonials) {
        /*Return an array of pages */
        res.jsonp(testimonials);
    }).catch(function(err) {
        console.log('could not fetch all Testimonials for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllTestimonialsFilteredByColumn*/


/*Get all Testimonials by search text */
exports.getAllTestimonialsBySearchText = function(req, res) {
    console.log('Testimonial Controller: entering getAllTestimonialsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('name'),Sequelize.col('media_url'),Sequelize.col('media_type'),Sequelize.col('profession'),Sequelize.col('testimonial'),Sequelize.col('email'),Sequelize.col('mobile'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all testimonials*/
    Testimonial.findAll(criteria).then(function(testimonials) {
        /*Return an array of pages */
        res.jsonp(testimonials);
    }).catch(function(err) {
        console.log('could not fetch all testimonials for search');
        console.log('err: %j', err);
    });
}; /*End of getAllTestimonialsBySearchText*/