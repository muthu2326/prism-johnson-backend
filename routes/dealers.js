var express = require('express');
var router = express.Router();
var dealersController = require('../controllers/dealers');

/* GET all dealers */
router.get('/', dealersController.getAllDealers);

/* GET details of a dealer */
router.get('/:id', dealersController.getOneDealerDetails);

/* Add a dealer */
router.post('/', dealersController.createDealer);

/* Update a dealer */
router.put('/:id', dealersController.updateDealer);

/* Delete a dealer */
router.delete('/:id', dealersController.deleteDealer);

module.exports = router;
