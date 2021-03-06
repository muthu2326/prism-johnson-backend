/*Beans Copyright info*/

var Sequelize = require('sequelize');
var db = require('../db/connection/db');
var message = require('../utils/message.json');
var slugify = require('slugify')
const {
    v4: uuidv4
} = require('uuid');
const fs = require('fs');
const csv = require('fast-csv');

/* var EntityModel = require('../models/init-models'); 
 * var Entity = EntityModel.initModels(db.getDbConnection())
 */

var ProductModel = require('../models/init-models');
var Product = ProductModel.initModels(db).product

var UserModel = require('../models/init-models');
var User = UserModel.initModels(db).user

var ProductMRPModel = require('../models/init-models');
const dealer = require('../models/dealer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var ProductMRP = ProductMRPModel.initModels(db).product_mrp_list;

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create product record.*/
exports.createProduct = function (req, res) {
    // Log entry.
    console.log('Product Controller: entering createProduct ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let productcode;
    if (req.body.slug == null || req.body.slug == '') {
        productcode = `PC${Math.random().toString(10).slice(3,10)}`
    } else {
        productcode = req.body.productcode
    }
    let slug = slugify(`${uuidv4().slice(4, 12)} ${productcode}`)

    console.log('product-code', productcode)
    let NOW = new Date()

    Product.create({
        id: req.body.id,
        productcode: productcode,
        media_type: req.body.media_type,
        media_url: req.body.media_url,
        title: req.body.title,
        short_description: req.body.short_description,
        description: req.body.description,
        lang: req.body.lang,
        slug: req.body.slug ? req.body.slug : slug,
        created: NOW,
        updated: NOW,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        csv_file_name: req.body.csv_file_name,
        features: req.body.features
    }).then(function (result) {
        console.log('created product', result);
        res.jsonp({
            status: 200,
            data: result,
            error: {}
        });
    }).catch(function (err) {
        console.log('Could not create product record');
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

} /*End of createProduct*/


/*Get a single product */
exports.getProduct = function (req, res) {
    // var product_id = req.params.product_id;
    console.log('Product Controller: entering getProduct ');
    /*Validate for a null id*/

    if (!req.params.slug) {
        res.status(400).jsonp({
            status: 400,
            data: {},
            error: {
                msg: message.invalid_get_request
            }
        });
        return;
    }

    let lang = req.query.lang ? req.query.lang : 'en'
    let slug = req.params.slug
    /* Query DB using sequelize api for a single product*/
    Product.findOne({
        where: {
            slug: slug,
            lang: lang
        },
        raw: true
    }).then(function (product) {
        // TODO:: handle no pincode
        if(product != null){
            ProductMRP.findOne({
                attributes: ['price'],
                where: {
                    productcode: product.productcode,
                    pincode: req.query.pincode ? req.query.pincode : '851111'
                },
                limit: 1
            }).then(p => {
                if (p) {
                    product.price = p.price;
                } else {
                    product.price = "Price not found for this pincode";
                }
                Product.findAll({
                        where: {
                            lang: lang
                        },
                        raw: true,
                        order: [
                            ['created', 'DESC']
                        ]
                    })
                    .then(function (products) {
                        console.log('products', products.length)
                        let list = products.filter((item) => {
                            return item.productcode != product.productcode
                        })
                        product.related_products = list
                        res.status(200).jsonp({
                            status: 200,
                            data: product,
                            error: {}
                        });
                        return;
                    })
                    .catch(function (err) {
                        console.log('could not fetch product');
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
            })
            .catch(function (err) {
                console.log('could not fetch product price');
                console.log('err: %j', err);
                res.status(500).jsonp({
                    status: 500,
                    data: {},
                    error: {
                        msg: 'pincode is required to fetch product price',
                        err: err
                    }
                });
                return;
            });
        }else{
            res.status(200).jsonp({
                status: 200,
                data: {
                    csv_file_name: null,
                    slug: null,
                    media_type: "image",
                    media_url: null,
                    title: "",
                    short_description: "",
                    description: null,
                    csv_file_name: null,
                    features: [],
                    productcode: null,
                  },
                error: {}
            });
        }
    }).catch(function (err) {
        console.log('could not fetch product price');
        console.log('err: %j', err);
        res.status(500).jsonp({
            status: 500,
            data: {},
            error: {
                msg: 'pincode is required to fetch product price',
                err: err
            }
        });
        return;
    })
} /*End of getProduct*/

exports.importProductPriceCSV = function (req, res) {
    console.log('Product Controller: entering importProductPriceCSV');
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

    let pincodeArray = []
    let uniquePincode = []
    Product.findAll({
        where: {
            lang: 'en'
        }
    }).then(function (products) {
        if (products.length > 0) {
            let product_price = []
            fs.createReadStream(req.file.path)
                .pipe(csv.parse({
                    headers: true
                }))
                .on("data", function (data) {
                    console.log('csv data: ')
                    if (data) {
                        let pincode = data.Pincode
                        products.forEach((item) => {
                            let product_name = item.title
                            if (data.hasOwnProperty(`${product_name}`)) {
                                if (!uniquePincode.includes(pincode)) {
                                    uniquePincode.push(pincode)
                                }
                                if (pincodeArray.includes(pincode)) { // checking for same pincode exists in the pincode array
                                    // console.log('pinocde exists')
                                    let count = 0
                                    pincodeArray.forEach((item) => { // getting same pincode count 
                                        if (item == pincode) {
                                            count++
                                        }
                                    })
                                    if (count < products.length) { // checking pincode code < products length
                                        console.log('count of pincode ', data.Pincode, count + 1)
                                        let slug = slugify(`${uuidv4().slice(4, 12)}`)
                                        let obj = {
                                            product_name: item.title,
                                            productcode: item.productcode,
                                            price: parseFloat(data[`${product_name}`]),
                                            postal_office: data.Taluk[0].toUpperCase() + data.PostalOffice.substr(1, data.PostalOffice.length).toLowerCase(),
                                            taluk: data.Taluk[0].toUpperCase() + data.Taluk.substr(1, data.Taluk.length).toLowerCase(),
                                            city: data['City/District'][0].toUpperCase() + data['City/District'].substr(1, data['City/District'].length).toLowerCase(),
                                            state: data.State[0].toUpperCase() + data.State.substr(1, data['City/District'].length).toLowerCase(),
                                            pincode: data.Pincode,
                                            slug: slug,
                                            created: NOW,
                                            updated: NOW
                                        }
                                        pincodeArray.push(pincode)
                                        product_price.push(obj)
                                    }
                                } else {
                                    console.log('no pincode found in pincode array', data.Pincode, 1)
                                    let slug = slugify(`${uuidv4().slice(4, 12)}`)
                                    let obj = {
                                        product_name: item.title,
                                        productcode: item.productcode,
                                        price: parseFloat(data[`${product_name}`]),
                                        postal_office: data.Taluk[0].toUpperCase() + data.PostalOffice.substr(1, data.PostalOffice.length).toLowerCase(),
                                        taluk: data.Taluk[0].toUpperCase() + data.Taluk.substr(1, data.Taluk.length).toLowerCase(),
                                        city: data['City/District'][0].toUpperCase() + data['City/District'].substr(1, data['City/District'].length).toLowerCase(),
                                        state: data.State[0].toUpperCase() + data.State.substr(1, data['City/District'].length).toLowerCase(),
                                        pincode: data.Pincode,
                                        slug: slug,
                                        created: NOW,
                                        updated: NOW
                                    }
                                    pincodeArray.push(pincode)
                                    product_price.push(obj)
                                }
                            }
                        })
                    }
                })
                .on("end", function () {
                    fs.unlinkSync(req.file.path); // remove temp file
                    console.log('end of csv')
                    console.log('sample object in product_price array', product_price[0])
                    console.log('prices array length', product_price.length)
                    if (product_price.length > 0) {
                        ProductMRP.bulkCreate(product_price, {
                                updateOnDuplicate: ["postal_office", "taluk", "price", "state", "city"]
                            })
                            .then(function (prices) {
                                console.log('created bulkdata length', prices.length)
                                console.log('pincodeArray', pincodeArray.length)
                                console.log('unique pincode', uniquePincode.length)
                                res.status(200).jsonp({
                                    status: 200,
                                    data: {
                                        msg: `Successfully created ${prices.length} price records for ${products.length} products`
                                    },
                                    error: {}
                                });
                                return;
                            })
                    } else {
                        res.status(400).jsonp({
                            status: 400,
                            data: {},
                            error: {
                                msg: `No data found to price records for ${products.length} products`
                            }
                        });
                        return;
                    }
                })
        } else {
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: `No products found to update the prices`
                }
            });
            return;
        }
    }).catch((err) => {
        console.log('could not delete/ create new all product prices');
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
}

/*Get all Products */
exports.getAllProducts = function (req, res) {
    console.log('Product Controller: entering getAllProducts');
    /* Query DB using sequelize api for all Products*/
    console.log('Query Controller: entering getAllQueries');
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let lang = req.query.lang ? req.query.lang : 'en'
    console.log('lang', lang)

    Product.findAll({
        where: {
            lang: lang
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(function (products) {
        /*Return an array of Products */
        if (products.length > 0) {
            res.status(200).jsonp({
                status: 200,
                data: products,
                error: {}
            });
        } else {
            res.status(200).jsonp({
                status: 200,
                data: [],
                error: {
                    msg: message.no_products_found
                }
            });
        }
    }).catch(function (err) {
        console.log('could not fetch all products');
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
}; /*End of getAllProducts*/


/*Update product record.*/
exports.updateProduct = function (req, res) {
    // Log entry.
    console.log('Product Controller: entering updateProduct ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    var product_id = req.params.product_id;
    let NOW = new Date()

    if (!req.params.product_id) {
        console.log('missing product_id in params')
        res.status(400).jsonp({
            status: 400,
            data: {},
            message: message.invalid_get_request
        });
        return
    }

    Product.update({
        productcode: req.body.productcode,
        media_type: req.body.media_type,
        media_url: req.body.media_url,
        title: req.body.title,
        short_description: req.body.short_description,
        description: req.body.description,
        lang: req.body.lang,
        updated: NOW,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        csv_file_name: req.body.csv_file_name,
        features: req.body.features
    }, {
        where: {
            /* product table primary key */
            id: product_id
        }
    }).then(function (result) {
        console.log('updated product', result);
        res.status(200).jsonp({
            status: 200,
            data: {
                msg: `${message.updated_product} ${req.params.product_id}`
            },
            error: {}
        });
    }).catch(function (err) {
        console.log('Could not update product record');
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
} /*End of updateProduct*/

/*Delete a single product */
exports.deleteProduct = function (req, res) {
    console.log('Product Controller: entering deleteProduct ');
    console.log('reqest params :: ', req.params)

    var product_id = req.params.product_id;
    /*Validate for a null product_id*/
    if (!req.params.product_id) {
        console.log('missing product_id in params')
        res.status(400).jsonp({
            status: 400,
            data: {},
            message: message.invalid_get_request
        });
        return
    }
    /* Delete product record*/
    Product.destroy({
        where: {
            id: product_id
        }
    }).then(function (product) {
        if (product != null) {
            res.status(200).jsonp({
                status: 200,
                data: {
                    msg: `${message.product_deleted} ${req.params.product_id}`
                },
                error: {}
            });
        } else {
            res.status(400).jsonp({
                status: 400,
                data: {},
                error: {
                    msg: message.product_not_found
                }
            });
        }
    }).catch(function (err) {
        console.log('could not delete product');
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
} /*End of deleteProduct*/


/*Get all Products for pagination */
exports.getAllProductsForPagination = function (req, res) {
    console.log('Product Controller: entering getAllProductsForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Products*/
    Product.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function (products) {
        /*Return an array of products */
        res.jsonp(products);
    }).catch(function (err) {
        console.log('could not fetch all products for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsForPagination*/

/*Get all sorted Products  */
exports.getAllProductsSortedByColumn = function (req, res) {
    console.log('Page Controller: entering getAllProductsSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Products*/
    Product.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function (products) {
        /*Return an array of Products */
        res.jsonp(products);
    }).catch(function (err) {
        console.log('could not fetch all Products for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsSortedByColumn*/

/*Get all filtered Products */
exports.getAllProductsFilteredByColumn = function (req, res) {
    console.log('Page Controller: entering getAllProductsFilteredByColumn');
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
    Product.findAll(criteria).then(function (products) {
        /*Return an array of pages */
        res.jsonp(products);
    }).catch(function (err) {
        console.log('could not fetch all Products for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsFilteredByColumn*/


/*Get all Products by search text */
exports.getAllProductsBySearchText = function (req, res) {
    console.log('Product Controller: entering getAllProductsBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'), Sequelize.col('productcode'), Sequelize.col('media_type'), Sequelize.col('media_url'), Sequelize.col('title'), Sequelize.col('short_description'), Sequelize.col('description'), Sequelize.col('lang'), Sequelize.col('slug'), Sequelize.col('created'), Sequelize.col('updated'), Sequelize.col('created_by'), Sequelize.col('updated_by'), Sequelize.col('pincode'), Sequelize.col('csv_file_name'), Sequelize.col('features')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all products*/
    Product.findAll(criteria).then(function (products) {
        /*Return an array of pages */
        res.jsonp(products);
    }).catch(function (err) {
        console.log('could not fetch all products for search');
        console.log('err: %j', err);
    });
}; /*End of getAllProductsBySearchText*/

//Import TTE Data CSV 
exports.importTteDataCSV = function(req,res){
    console.log('TTE Controller: entering importTteDataCSV');
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

    let tte_list = []
    let lang = 'en';
    let role = 'tte';

    res.status(200).jsonp({
        status: 200,
        data: {
            msg: 'Your request is accepted'
        },
        error: {}
    });

    fs.createReadStream(req.file.path)
        .pipe(csv.parse({
            headers: true
        }))
        .on("data", function (data) {
            console.log('csv data: tte')
            console.log("data",data)

            let slug = slugify(`${uuidv4().slice(4, 15)}`)
            let password;
            let tte_code = data['Email'];
            console.log('setting tte_code as password for :: ', tte_code)

            password = bcrypt.hashSync(tte_code, saltRounds);

            let obj = {
                name: data['Name'],
                mobile: data['Mobile'],
                address: data['Address'],
                cities: data['Cities'] ? [data['Cities']]: [],
                state: data['State'],
                pincode: data['Pincode'],
                email: data['Email'],
                password: password,
                reset_pasword_link_sent: 0,
                lang: lang,
                role:role,
                slug: slug,
                created: NOW,
                updated: NOW
            }
            if(obj.email !== ''){
                tte_list.push(obj)
            }
            
        })
        .on("end", function () {
            fs.unlinkSync(req.file.path);
            if (tte_list.length > 0) {
                User.bulkCreate(tte_list, {
                        updateOnDuplicate: ["name", "pincode", "address", "email", "lang", "contact_no", "state", "cities", "password"]
                    })
                    .then(function (tteResponse) {
                        // res.status(200).jsonp({
                        //     status: 200,
                        //     data: dealersResponse.length,
                        //     error: {}
                        // });
                        console.log('dealersResponse created', tteResponse.length)
                        // return;
                    }).catch((err) => {
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
                    })
            } else {
                res.status(400).jsonp({
                    status: 400,
                    data: {},
                    error: {
                        msg: `No tte data found for creation`
                    }
                });
                return;
            }
        })
}