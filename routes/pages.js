var express = require('express');
var router = express.Router();
var pagesController = require('../controllers/pages');

/* GET pages content */
router.get('/', pagesController.getPagesContent);

/* GET platform brief like tips summary, testimonial etc.,*/
router.get('/platform-brief', pagesController.getPlatformBrief);

/* Update pages content */
router.put('/:page_name', pagesController.updatePagesContent);

module.exports = router;
