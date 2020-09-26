var express = require('express');
var router = express.Router();
var utilController = require('../controllers/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prism Johnson API Server' });
});

/* GET all cities */
router.get('/cities', utilController.getAllCities);


/* GET Grih Nirman stages & sections */
router.get('/grih-nirman-sections', utilController.getGrihNirmanDetails);

module.exports = router;
