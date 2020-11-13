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

var ArticleModel = require('../models/init-models');
var Article = ArticleModel.initModels(db).articles

var SectionModel = require('../models/init-models');
var Section = SectionModel.initModels(db).sections

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create articles record.*/
exports.createArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering createArticle ');
    console.log('req body :: ', req.body)
    console.log('req params :: ', req.params)
    console.log('req query :: ', req.query)

    let NOW = new Date()
    let slug = slugify(`${uuidv4().slice(4, 12)}`)

    Article.create({
        type : req.body.type,
        category: req.body.category,
        media_type : req.body.media_type,
        media_url : req.body.media_url,
        title : req.body.title,
        short_description : req.body.short_description,
        description : req.body.description,
        lang : req.body.lang,
        slug : req.body.slug? req.body.slug : slug,
        created : NOW,
        updated : NOW
    }).then(function(result) {
        console.log('created articles', result);
        let article_id = result.dataValues.id
        let slug;
        if(req.body.sections.length > 0){
            let sections = req.body.sections.map((item) => {
                slug = slugify(`${uuidv4().slice(4, 12)}`)
                return {
                    type: item.type,
                    article_id: article_id,
                    media_type: item.media_type,
                    sub_title: item.title,
                    description: item.description,
                    features: item.features,
                    lang: item.lang,
                    slug: slug
                }
            })
        }
        let sections = 
        res.jsonp({
            status: 200,
            data: result,
            error: {}
        });
    }).catch(function(err) {
        console.log('Could not create articles record');
        console.log('err: %j', err);
    });

} /*End of createArticle*/


/*Get a single articles */
exports.getArticle = function(req, res) {
    var articles_id = req.params.articles_id;
    console.log('Article Controller: entering getArticle ');
    /*Validate for a null id*/
    if (!articles_id) {
        res.status(400).send("articles ID is null");
        return;
    }
    /* Query DB using sequelize api for a single articles*/
    Article.findOne({
        where: {
            id: articles_id
        }
    }).then(function(articles) {
        console.log(articles);
        res.jsonp({
            status: 200,
            data: {
                "id": 1,
                "type" : "our_service",
                "category": "cement",
                "media_type" : "image",
                "media_url" : "http://img1",
                "title" : "Individual Home Builders",
                "description" : "The aim of the company is to enlighten IHBs on the complexities involved in construction, effective planning to achieve economy and finally constructing a strong and durable house with superior quality materials without any time overrun. Services to home builders are enumerated as below :-",
                "sections": [
                    {
                        "id": 1,
                        "value": {
                          "media_type" : "image",
                          "media_url" : "https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/Bitmap%402x.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCmFwLXNvdXRoLTEiRjBEAiBl3BfyhNWa78KbclIBs2f2c6%2FM2PYXKJVhOWw%2BcFVThwIgDhHGQTIrauTVrTr6w1XEFzERM7wU2jWArHvdeIlF%2Bpkq5gIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw0NDE0ODc0OTM4MjgiDCm69fPGg4%2BQFV24SSq6AhAcFP6S%2BP8sZMPPC2yKNB%2FTkKpc5BVYUFHWq5GNr%2BRfGrUUKR3OVGlJQ7%2BP%2FH7uaxduzpZxlnq0eZAKAlvFuKcNnd1zC1H4VY3Bfn1SpT8keOcU1uAONampsss%2Fyq3DnreHl0PdFXN4dOdWG%2B0tg%2FIREQgf6VOvXNlM6RbiU8vaQiTMmCROyaLizCILsWkWg2hZT4OBlFIeq8Phbvt5LlciS5tIUZeHD41gTdl8Ugz9nTz0pkNgVTSjueXAzBQPYLUcv%2BMiZnu3v417ZzFOLKZQWAjEXCP%2FEwfURBx1aAPMGT%2BZvJDbqs37DBedz1X%2FGfSNLcaAu%2FtwYe5eyvHEBHry5jao4k3QUPVnRZ%2BFXbLMwofM31hvB356ol2Kh4pWkKFLZfK5kQddHW%2Fb8OsbHan%2FK%2BdNemxhz14GMIvMuP0FOrECx85%2FedehtuIpGBGMtoQu%2FAgGlQ%2BuTo%2Bc66y4e2rrK62PCJwhJI32ba45Rka2o%2B2lCTfN8irPYfoP3bV0kOkRzrx%2BVgBVRtq%2FdNxX9ls56QRPgQiLiID3kbSmfYUiqbpOBzqnozVe2%2BgELV4Hd4BFEtxJ3WuSQp2m5rn9TAcwiHBb3gM00AlSE0lQa4ijL%2FPEkrFpBn2oSPT0V4r6U39GHP%2BsdJevQXGS8h4AdD2z7aBA45Vhw8mJ3pbfCHXgl%2Bp1H6mHeKPUNQjY2oucBNwyJBlyQwQMq6EGq0fYDb1k4LvdCY%2FTfkkJOEhetqK8R6jwaAuVipQZEP2nTJ3dpOTYZDCAom5Z8C9bfePDtmlqkOxjLoy%2B%2B2AKo8CsT2BLcuF%2BmqYxiko3SJeBs6hno9SCfKU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T062600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWNSVURLCIL3QZ7VO%2F20201113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3467134cf383833db0125173b845345d777539ca3149b70f2067af0587cf7b61",
                          "title" : "",
                          "description" : "The aim of the company is to enlighten IHBs on the complexities involved in construction, effective planning to achieve economy and finally constructing a strong and durable house with superior quality materials without any time overrun. Services to home builders are enumerated as below :-",
                          "slug": "section-1",
                          "lang": 'en',
                          "features": [
                              { "id": 1,
                              "value": "Construction tips"},
                              { "id": 2,
                              "value": "Planning"},
                              { "id": 3,
                              "value": "Cost Effective packages- We also provide technical support services in the form of various lucrative packages, some of them have been listed down below:-"}
                          ],
                          "created": "2020-11-11T19:43:55.000Z",
                          "updated": "2020-11-11T19:43:55.000Z"
                        }
                    },
                    {
                        "id": 2,
                        "value": {
                          "media_type" : "image",
                          "media_url" : "https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/Group%20341%402x.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCmFwLXNvdXRoLTEiRjBEAiBl3BfyhNWa78KbclIBs2f2c6%2FM2PYXKJVhOWw%2BcFVThwIgDhHGQTIrauTVrTr6w1XEFzERM7wU2jWArHvdeIlF%2Bpkq5gIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw0NDE0ODc0OTM4MjgiDCm69fPGg4%2BQFV24SSq6AhAcFP6S%2BP8sZMPPC2yKNB%2FTkKpc5BVYUFHWq5GNr%2BRfGrUUKR3OVGlJQ7%2BP%2FH7uaxduzpZxlnq0eZAKAlvFuKcNnd1zC1H4VY3Bfn1SpT8keOcU1uAONampsss%2Fyq3DnreHl0PdFXN4dOdWG%2B0tg%2FIREQgf6VOvXNlM6RbiU8vaQiTMmCROyaLizCILsWkWg2hZT4OBlFIeq8Phbvt5LlciS5tIUZeHD41gTdl8Ugz9nTz0pkNgVTSjueXAzBQPYLUcv%2BMiZnu3v417ZzFOLKZQWAjEXCP%2FEwfURBx1aAPMGT%2BZvJDbqs37DBedz1X%2FGfSNLcaAu%2FtwYe5eyvHEBHry5jao4k3QUPVnRZ%2BFXbLMwofM31hvB356ol2Kh4pWkKFLZfK5kQddHW%2Fb8OsbHan%2FK%2BdNemxhz14GMIvMuP0FOrECx85%2FedehtuIpGBGMtoQu%2FAgGlQ%2BuTo%2Bc66y4e2rrK62PCJwhJI32ba45Rka2o%2B2lCTfN8irPYfoP3bV0kOkRzrx%2BVgBVRtq%2FdNxX9ls56QRPgQiLiID3kbSmfYUiqbpOBzqnozVe2%2BgELV4Hd4BFEtxJ3WuSQp2m5rn9TAcwiHBb3gM00AlSE0lQa4ijL%2FPEkrFpBn2oSPT0V4r6U39GHP%2BsdJevQXGS8h4AdD2z7aBA45Vhw8mJ3pbfCHXgl%2Bp1H6mHeKPUNQjY2oucBNwyJBlyQwQMq6EGq0fYDb1k4LvdCY%2FTfkkJOEhetqK8R6jwaAuVipQZEP2nTJ3dpOTYZDCAom5Z8C9bfePDtmlqkOxjLoy%2B%2B2AKo8CsT2BLcuF%2BmqYxiko3SJeBs6hno9SCfKU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T062631Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWNSVURLCIL3QZ7VO%2F20201113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=84fe24580704b1a50fde7aa664c02ff4d03d3e223d3ea38fb72c11c14a3bf987",
                          "title": "Ghar aapka, zimmedari hamaari",
                          "description" : "Ghar aapka, zimmedari hamaari' – Sabse surakshit ghar can’t be made only with best cement. It also requires the right mentoring, accessories and sand. We take care of all these and provide you a full building solution, rather than just cement. We provide you these for free along with our cement. We provide the following services in this package:-",
                          "slug": "section-2",
                          "lang": 'en',
                          "features": [ {
                            "id": 4,
                            "value":"Accessories provided- Cover blocks"
                          }, {
                            "id": 5,
                            "value":"Site Monitoring include- Slab Monitoring, Mason training and IHB Training"
                          }, {
                            "id": 6,
                            "value":"Sand Quality Test"
                          },  ],
                          "created": "2020-11-11T19:43:55.000Z",
                          "updated": "2020-11-11T19:43:55.000Z"
                        }
                    }
                ],
                "lang" : "en",
                "slug" : null,
            },
            error: {}
        });
    }).catch(function(err) {
        console.log('could not fetch articles');
        console.log('err: %j', err);
    });
} /*End of getArticle*/

/*Get all Articles */
exports.getAllArticles = function(req, res) {
    console.log('Article Controller: entering getAllArticles');
    /* Query DB using sequelize api for all Articles*/
    Article.findAll().then(function(articles) {
        /*Return an array of Articles */
        res.jsonp({
            "status": 200,
            "data": [{
                    "id": 1,
                    "type" : "our_service",
                    "category": "cement",
                    "media_type" : "image",
                    "media_url" : "http://img1",
                    "title" : "Individual Home Builders",
                    "description" : "The aim of the company is to enlighten IHBs on the complexities involved in construction, effective planning to achieve economy and finally constructing a strong and durable house with superior quality materials without any time overrun. Services to home builders are enumerated as below :-",
                    "sections": [
                        {
                            "id": 1,
                            "value": {
                              "media_type" : "image",
                              "media_url" : "https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/Bitmap%402x.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCmFwLXNvdXRoLTEiRjBEAiBl3BfyhNWa78KbclIBs2f2c6%2FM2PYXKJVhOWw%2BcFVThwIgDhHGQTIrauTVrTr6w1XEFzERM7wU2jWArHvdeIlF%2Bpkq5gIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw0NDE0ODc0OTM4MjgiDCm69fPGg4%2BQFV24SSq6AhAcFP6S%2BP8sZMPPC2yKNB%2FTkKpc5BVYUFHWq5GNr%2BRfGrUUKR3OVGlJQ7%2BP%2FH7uaxduzpZxlnq0eZAKAlvFuKcNnd1zC1H4VY3Bfn1SpT8keOcU1uAONampsss%2Fyq3DnreHl0PdFXN4dOdWG%2B0tg%2FIREQgf6VOvXNlM6RbiU8vaQiTMmCROyaLizCILsWkWg2hZT4OBlFIeq8Phbvt5LlciS5tIUZeHD41gTdl8Ugz9nTz0pkNgVTSjueXAzBQPYLUcv%2BMiZnu3v417ZzFOLKZQWAjEXCP%2FEwfURBx1aAPMGT%2BZvJDbqs37DBedz1X%2FGfSNLcaAu%2FtwYe5eyvHEBHry5jao4k3QUPVnRZ%2BFXbLMwofM31hvB356ol2Kh4pWkKFLZfK5kQddHW%2Fb8OsbHan%2FK%2BdNemxhz14GMIvMuP0FOrECx85%2FedehtuIpGBGMtoQu%2FAgGlQ%2BuTo%2Bc66y4e2rrK62PCJwhJI32ba45Rka2o%2B2lCTfN8irPYfoP3bV0kOkRzrx%2BVgBVRtq%2FdNxX9ls56QRPgQiLiID3kbSmfYUiqbpOBzqnozVe2%2BgELV4Hd4BFEtxJ3WuSQp2m5rn9TAcwiHBb3gM00AlSE0lQa4ijL%2FPEkrFpBn2oSPT0V4r6U39GHP%2BsdJevQXGS8h4AdD2z7aBA45Vhw8mJ3pbfCHXgl%2Bp1H6mHeKPUNQjY2oucBNwyJBlyQwQMq6EGq0fYDb1k4LvdCY%2FTfkkJOEhetqK8R6jwaAuVipQZEP2nTJ3dpOTYZDCAom5Z8C9bfePDtmlqkOxjLoy%2B%2B2AKo8CsT2BLcuF%2BmqYxiko3SJeBs6hno9SCfKU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T062600Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWNSVURLCIL3QZ7VO%2F20201113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3467134cf383833db0125173b845345d777539ca3149b70f2067af0587cf7b61",
                              "title" : "",
                              "description" : "The aim of the company is to enlighten IHBs on the complexities involved in construction, effective planning to achieve economy and finally constructing a strong and durable house with superior quality materials without any time overrun. Services to home builders are enumerated as below :-",
                              "slug": "section-1",
                              "lang": 'en',
                              "features": [
                                  { "id": 1,
                                  "value": "Construction tips"},
                                  { "id": 2,
                                  "value": "Planning"},
                                  { "id": 3,
                                  "value": "Cost Effective packages- We also provide technical support services in the form of various lucrative packages, some of them have been listed down below:-"}
                              ],
                              "created": "2020-11-11T19:43:55.000Z",
                              "updated": "2020-11-11T19:43:55.000Z"
                            }
                        },
                        {
                            "id": 2,
                            "value": {
                              "media_type" : "image",
                              "media_url" : "https://prism-johnson-cement-media-assets.s3.ap-south-1.amazonaws.com/cement-products/Group%20341%402x.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE4aCmFwLXNvdXRoLTEiRjBEAiBl3BfyhNWa78KbclIBs2f2c6%2FM2PYXKJVhOWw%2BcFVThwIgDhHGQTIrauTVrTr6w1XEFzERM7wU2jWArHvdeIlF%2Bpkq5gIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw0NDE0ODc0OTM4MjgiDCm69fPGg4%2BQFV24SSq6AhAcFP6S%2BP8sZMPPC2yKNB%2FTkKpc5BVYUFHWq5GNr%2BRfGrUUKR3OVGlJQ7%2BP%2FH7uaxduzpZxlnq0eZAKAlvFuKcNnd1zC1H4VY3Bfn1SpT8keOcU1uAONampsss%2Fyq3DnreHl0PdFXN4dOdWG%2B0tg%2FIREQgf6VOvXNlM6RbiU8vaQiTMmCROyaLizCILsWkWg2hZT4OBlFIeq8Phbvt5LlciS5tIUZeHD41gTdl8Ugz9nTz0pkNgVTSjueXAzBQPYLUcv%2BMiZnu3v417ZzFOLKZQWAjEXCP%2FEwfURBx1aAPMGT%2BZvJDbqs37DBedz1X%2FGfSNLcaAu%2FtwYe5eyvHEBHry5jao4k3QUPVnRZ%2BFXbLMwofM31hvB356ol2Kh4pWkKFLZfK5kQddHW%2Fb8OsbHan%2FK%2BdNemxhz14GMIvMuP0FOrECx85%2FedehtuIpGBGMtoQu%2FAgGlQ%2BuTo%2Bc66y4e2rrK62PCJwhJI32ba45Rka2o%2B2lCTfN8irPYfoP3bV0kOkRzrx%2BVgBVRtq%2FdNxX9ls56QRPgQiLiID3kbSmfYUiqbpOBzqnozVe2%2BgELV4Hd4BFEtxJ3WuSQp2m5rn9TAcwiHBb3gM00AlSE0lQa4ijL%2FPEkrFpBn2oSPT0V4r6U39GHP%2BsdJevQXGS8h4AdD2z7aBA45Vhw8mJ3pbfCHXgl%2Bp1H6mHeKPUNQjY2oucBNwyJBlyQwQMq6EGq0fYDb1k4LvdCY%2FTfkkJOEhetqK8R6jwaAuVipQZEP2nTJ3dpOTYZDCAom5Z8C9bfePDtmlqkOxjLoy%2B%2B2AKo8CsT2BLcuF%2BmqYxiko3SJeBs6hno9SCfKU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201113T062631Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWNSVURLCIL3QZ7VO%2F20201113%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=84fe24580704b1a50fde7aa664c02ff4d03d3e223d3ea38fb72c11c14a3bf987",
                              "title": "Ghar aapka, zimmedari hamaari",
                              "description" : "Ghar aapka, zimmedari hamaari' – Sabse surakshit ghar can’t be made only with best cement. It also requires the right mentoring, accessories and sand. We take care of all these and provide you a full building solution, rather than just cement. We provide you these for free along with our cement. We provide the following services in this package:-",
                              "slug": "section-2",
                              "lang": 'en',
                              "features": [ {
                                "id": 4,
                                "value":"Accessories provided- Cover blocks"
                              }, {
                                "id": 5,
                                "value":"Site Monitoring include- Slab Monitoring, Mason training and IHB Training"
                              }, {
                                "id": 6,
                                "value":"Sand Quality Test"
                              },  ],
                              "created": "2020-11-11T19:43:55.000Z",
                              "updated": "2020-11-11T19:43:55.000Z"
                            }
                        }
                    ],
                    "lang" : "en",
                    "slug" : null,
                }],
                  error: {}
          });
    }).catch(function(err) {
        console.log('could not fetch all articles');
        console.log('err: %j', err);
    });
}; /*End of getAllArticles*/


/*Update articles record.*/
exports.updateArticle = function(req, res) {
    // Log entry.
    console.log('Article Controller: entering updateArticle ');

    var articles_id = req.params.articles_id;
    Article.update({
        id : req.body.id,
				type : req.body.type,
				media_type : req.body.media_type,
				media_url : req.body.media_url,
				title : req.body.title,
				short_description : req.body.short_description,
				description : req.body.description,
				lang : req.body.lang,
				slug : req.body.slug,
				created : req.body.created,
				updated : req.body.updated
    }, {
        where: {
            /* articles table primary key */
            id: articles_id
        }
    }).then(function(result) {
        console.log('updated articles', result);
        res.send("articles updated successfully");
    }).catch(function(err) {
        console.log('Could not update articles record');
        console.log('err: %j', err);
    });

} /*End of updateArticle*/

/*Delete a single article */
exports.deleteArticle = function(req, res) {
    console.log('Article Controller: entering deleteArticle ');

    var articles_id = req.params.articles_id;
    /*Validate for a null articles_id*/
    if (!articles_id) {
        res.status(400).send("articles ID is null");
        return;
    }
    /* Delete articles record*/
    Article.destroy({
        where: {
            id: articles_id
        }
    }).then(function(article) {
        console.log(article);
        res.jsonp(article);
    }).catch(function(err) {
        console.log('could not delete article');
        console.log('err: %j', err);

    });
} /*End of deleteArticle*/


/*Get all Articles for pagination */
exports.getAllArticlesForPagination = function(req, res) {
    console.log('Article Controller: entering getAllArticlesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Articles*/
    Article.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(articles) {
        /*Return an array of articles */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all articles for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesForPagination*/

/*Get all sorted Articles  */
exports.getAllArticlesSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllArticlesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Articles*/
    Article.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(articles) {
        /*Return an array of Articles */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all Articles for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesSortedByColumn*/

/*Get all filtered Articles */
exports.getAllArticlesFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllArticlesFilteredByColumn');
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
    Article.findAll(criteria).then(function(articles) {
        /*Return an array of pages */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all Articles for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesFilteredByColumn*/


/*Get all Articles by search text */
exports.getAllArticlesBySearchText = function(req, res) {
    console.log('Article Controller: entering getAllArticlesBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('type'),Sequelize.col('media_type'),Sequelize.col('media_url'),Sequelize.col('title'),Sequelize.col('short_description'),Sequelize.col('description'),Sequelize.col('lang'),Sequelize.col('slug'),Sequelize.col('created'),Sequelize.col('updated')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all articles*/
    Article.findAll(criteria).then(function(articles) {
        /*Return an array of pages */
        res.jsonp(articles);
    }).catch(function(err) {
        console.log('could not fetch all articles for search');
        console.log('err: %j', err);
    });
}; /*End of getAllArticlesBySearchText*/