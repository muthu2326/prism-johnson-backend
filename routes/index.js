var express = require('express');
var router = express.Router();
var utilController = require('../controllers/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prism Johnson API Server' });
});

module.exports = router;
