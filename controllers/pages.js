const log = require('../utils/logger').get();
config = require('config');
log.setLevel(config.log_level);
const FILE_INFO = 'Pages Controller';
var getPagesContent = (req,res) => {
    let response = {
        "home_page":{
            "carousel":[
                {
                    "title":"Building a Better Tomorrow",
                    "description":"Naini bridge , Prayagraj.",
                    "banner_image":"https://www.prismcement.com/images/v2-new-bnr-1.jpg"
                },
                {
                    "title":"Building a Green Future",
                    "description":"Prism Cement, Satna Plant, Madhya Pradesh.",
                    "banner_image":"https://www.prismcement.com/images/v2-new-bnr-2.jpg"
                },
                {
                    "title":"Building a New India",
                    "description":"Airport Road, Varanasi",
                    "banner_image":"https://www.prismcement.com/images/v2-new-bnr-3.jpg"
                },
                {
                    "title":"Building a Better Tomorrow",
                    "description":"Devine Hospital, Lucknow",
                    "banner_image":"https://www.prismcement.com/images/v2-new-bnr-4.jpg"
                }
            ],
            "introduction":{
                "title":"Amongst India's largest integrated Building Materials Company",
                "video":"https://www.youtube.com/watch?v=nMo4S70oNBk",
                "description":"Established in 1997 promoted by the Rajan Raheja Group, Prism Cement is one of the largest cement plant at a single location in the country at Satna. Starting from 2.6 million tons in 1996, the production capacity has expanded to 7 million tons today. We manufacture Portland Pozzolana Cement (PPC) under three brand names - ‘Prism Champion’, ‘Prism Champion Plus’ and ‘Prism Duratech’ and full range of Ordinary Portland Cement (OPC) for specialized cement concrete applications. We have consolidated our position as one of the premium cement manufacturer in India."
            },
            "dealer_locater":{
                "description":"Prism Cement has a 3,700+ strong dealers network serviced from 200 stocking points, spread across UP, MP and Bihar. Prism has its corporate office in Mumbai, with CMO in Varanasi and eight regional offices located across UP, MP and Bihar."
            },
            "help":{
                "tol_free_number":"1800 572 1444"
            }
        }
    };
    res.status(200).send(response);
}

var updatePagesContent = (req,res) => {
    const FUN_LABEL = `\n\t updatePagesContent ${FILE_INFO} \n\t`; 
    log.info(`${FUN_LABEL} IN`);
    log.debug(`${FUN_LABEL} req params ${JSON.stringify(req.params)}`);
    log.info(`${FUN_LABEL} OUT`);
    res.status(200).send("DONE");
}
module.exports = {
    getPagesContent,
    updatePagesContent
};
