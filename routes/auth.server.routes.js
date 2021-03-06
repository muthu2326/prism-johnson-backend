var express = require('express');
var router = express.Router();
var Auth = require('../controllers/auth.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/*user login*/
router.post('/login', upload.array(), /*auth.isAuthenticated,*/ Auth.login);

router.post('/changePassword', upload.array(), Auth.changePassword)

router.post('/forgotPassword', upload.array(), /*auth.isAuthenticated,*/ Auth.forgotPassword);

router.post('/resetPassword', upload.array(), /*auth.isAuthenticated,*/ Auth.resetPassword);

router.post('/push-notification', upload.array(), /*auth.isAuthenticated,*/ Auth.sendSinglenotification);

module.exports = router;