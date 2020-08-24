var express = require('express');
var router = express.Router();
var pagesController = require('../controllers/pages');

/* GET pages content */
router.get('/', pagesController.getPagesContent);

/* Update pages content */
router.put('/:page_name', pagesController.updatePagesContent);

module.exports = router;
