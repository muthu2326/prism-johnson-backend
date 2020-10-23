var express = require('express');
var router = express.Router();
var mediaAssetController = require('../controllers/media_asset');

/* GET all media assets */
router.get('/', mediaAssetController.getAllMediaAssets);

module.exports = router;
