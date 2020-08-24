var express = require('express');
var router = express.Router();
var constructionTipsController = require('../controllers/construction_tips');

/* GET construction tips */
router.get('/', constructionTipsController.getAllConstructionTips);

/* Add a construction tip */
router.post('/', constructionTipsController.createConstructionTips);

/* Update a construction tip */
router.put('/:id', constructionTipsController.updateConstructionTips);

module.exports = router;
