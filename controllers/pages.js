const log = require('../utils/logger').get();
config = require('config');
const fs = require('fs');
log.setLevel(config.log_level);

const FILE_INFO = 'Pages Controller';
const PAGE_CONTENT_FILE = 'docs/page_content/page_content.json';
const HOME_PAGE = 'home-page';
const INTRO_PAGE = 'intro-page';

var getPagesContent = (req,res) => {
    let pageContent = null;
    try {
        pageContent = fs.readFileSync('docs/page_content/page_content.json');
        log.debug(pageContent.toString());
    } catch (err) {
        log.error(err);
    }
    response = JSON.parse(pageContent);
    res.status(200).send(response);
}

var updatePagesContent = (req,res) => {
    const FUN_LABEL = `\n\t updatePagesContent ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    try {
        pageContent = JSON.parse(fs.readFileSync(PAGE_CONTENT_FILE));
        log.debug(pageContent.toString());
    } catch (err) {
        log.error(err);
    }
    if(req.params.page_name === HOME_PAGE) {
        // TODO:: Add validation for home page has all the required fields
        pageContent.home_page = req.body;
        log.debug('After populated content')
        log.debug(pageContent)
        try {
            fs.writeFileSync(PAGE_CONTENT_FILE, JSON.stringify(pageContent));
            log.info("File has been saved.");
        } catch (error) {
            log.error(err);
        }

    } else {
        pageContent.others = req.body;
        try {
            fs.writeFileSync(PAGE_CONTENT_FILE, JSON.stringify(pageContent));
            log.info("File has been saved.");
        } catch (error) {
            log.error(err);
        }
    }
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send("DONE");
}

var getPlatformBrief = (req,res) => {
    const FUN_LABEL = `\n\t getPlatformBrief ${FILE_INFO} \n\t`; 
    let response = {};
    log.info(`${FUN_LABEL} IN`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    
    response = {
        "product_categories":[
            {
                "name":"Cements",
                "banner_image_url":"https://www.prismcement.com/images/prod-1.png"
            },
            {
                "name":"Tiles",
                "banner_image_url":"https://www.prismcement.com/images/prod-2.png"
            },
            {
                "name":"Bath Fittings",
                "banner_image_url":"https://www.prismcement.com/images/prod-3.png"
            }
        ],
        "construction_tips":["https://www.prismcement.com/images/sol-1.jpg", "https://www.prismcement.com/images/sol-2.jpg", "https://www.prismcement.com/images/sol-3.jpg"],
        "testimonials":[
            {
                "customer_name":"Manoj",
                "description":"Long lasting"
            },
            {
                "customer_name":"Babu",
                "description":"Worth for the cost"
            }
        ],
        "media_centre":["https://www.prismcement.com/images/sol-6.jpg", "https://www.youtube.com/watch?v=whvihpvXOiI", "https://www.youtube.com/watch?v=whvihpvXOiI"]
    }

    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send(response);
}

module.exports = {
    getPagesContent,
    updatePagesContent,
    getPlatformBrief
};
