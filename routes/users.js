var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', usersController.getUsers);

/* GET one user. */
router.get('/:id', usersController.getOneUser);

/* create a user. */
router.post('/', usersController.createUser);

/* create Admin / TTE. */
router.post('/admin', usersController.createAdminUser);

/* Update Admin / TTE. */
router.put('/admin/:id', usersController.updateAdminUser);

/* GET admin users. */
router.get('/admin', usersController.getAdminUsers);

/* GET one admin user. */
router.get('/admin/:id', usersController.getOneAdminUser);

/* Delete Admin/TTE */
router.delete('/admin/:id', usersController.deleteAdminUser);

module.exports = router;
