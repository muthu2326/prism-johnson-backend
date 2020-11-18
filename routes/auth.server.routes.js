var express = require('express');
var router = express.Router();
var Auth = require('../controllers/auth.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/*user login*/
router.post('/login', upload.array(), /*auth.isAuthenticated,*/ Auth.login);

router.post('/forgotPassword', upload.array(), /*auth.isAuthenticated,*/ Auth.forgotPassword);

module.exports = router;