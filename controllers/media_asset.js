const log = require('../utils/logger').get();
config = require('config');
const FILE_INFO = 'Media Asset Controller';
const HINDI_LANG = 'hi';
const ENGLISH_LANG = 'en';
const db = require('../models');
const util = require('../utils/util');
const MESSAGES = require('../utils/message.json');
// const ArticleModel = db.Article;
// const cityMasterModel = db.city_master;
const Op = db.Sequelize.Op;

var getAllMediaAssets = (req,res) => {
    const FUN_LABEL = `\n\t getAllMediaAssets ${FILE_INFO} \n\t`; 
    let response = {};
    let apiResponse = {};
    let queryCondition = {};
    log.info(`${FUN_LABEL} IN`);
    log.info(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} req query ${JSON.stringify(req.query)}`);
    // let sec = Number(req.query.section)
    // if(sec) {
    //     queryCondition = {
    //         where :{
    //             section_id : sec 
    //         }
    //     }
    // }
    // log.info(`${FUN_LABEL} going to make articleService.getAllArticles call`);
    // articleService.getAllArticles(req, res, queryCondition, (error, serviceResponse) => {
    //     log.info(`${FUN_LABEL} received response for articleService.getAllArticles call`);
    //     log.debug(serviceResponse);
    //     log.debug(`Query string ${JSON.stringify(req.query)}`);
    //     log.debug(error);
    //     if(!error) {
    //         response.articles = []
    //         if(serviceResponse.result.length > 0) {
    //             response.articles = util.formatJSONBasedOnLang(serviceResponse.result, req.query.lang);
    //         }
    //         response.count = serviceResponse.result.length;
    //         if(sec) {
    //             response.section_name = response.articles[0]? response.articles[0].section_name : secName;
    //             response.section_id = sec;
    //             apiResponse.message = 'Fetched articles of this section';
    //         } else {
    //             response.section = 'All sections'
    //             apiResponse.message = 'Fetched articles of all sections';
    //         }
    //         apiResponse.code = 'fetched_articles';
    //         if(serviceResponse.result.length === 0) {
    //             apiResponse.message = "No articles available";
    //             apiResponse.code = "not_found";
    //         }
    //         apiResponse.data = response;
    //         res.status(200).send(apiResponse);
    //     } else {
    //         res.status(500).send(MESSAGES.server_error_message);
    //     }
    // })
    
    // Mock response for get articles of one section
    apiResponse.code = "Fetched media assets";
    apiResponse.message = "fetched_media_assets";
    if(req.query.media_type === "image") {
        apiResponse.data = [
            {
                "id" :1,
                "title" : "title name",
                "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-25 08:01:16",
                "updated_at" : "2020-08-26 08:01:16"
            },
            {
                "id" :2,
                "title" : "2-title name",
                "description" : "2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-24 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 3,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 4,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 5,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 6,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 7,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 8,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 9,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 10,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.prismcement.com/images/product-banner.jpg",
                "media_type" : "image",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            }
        ]
    } else if(req.query.media_type === "video") {
        apiResponse.data = [
            {
                "id" :1,
                "title" : "title name",
                "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-25 08:01:16",
                "updated_at" : "2020-08-26 08:01:16"
            },
            {
                "id" :2,
                "title" : "2-title name",
                "description" : "2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-24 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 3,
                "title" : "3-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 4,
                "title" : "4-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 5,
                "title" : "5-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 6,
                "title" : "6-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 7,
                "title" : "7-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 8,
                "title" : "8-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 9,
                "title" : "9-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            },
            {
                "id" : 10,
                "title" : "10-title name",
                "description" : "3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "media_url" : "https://www.youtube.com/watch?v=whvihpvXOiI",
                "media_type" : "video",
                "created_at" : "2020-08-30 08:01:16",
                "updated_at" : "2020-09-26 08:01:16"
            }
        ]
    }
    
    res.header('X-Total-Count', 10);
    res.status(200).send(apiResponse);
}


module.exports = {
    getAllMediaAssets
};
