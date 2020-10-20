var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

/* Login */
router.post('/login', authController.login);

/* Logout */
router.post('/logout', authController.logout);

/* Forgot password */
router.post('/forgot-password', authController.sendResetPasswordLink);

/* Reset password */
router.post('/reset-password', authController.resetPassword);

/* Change password, admin can change their password & TTE/Dealer password */
// router.post('/change-password', authController.changePassword);

module.exports = router;
