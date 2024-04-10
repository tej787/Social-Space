const express = require('express');
const authController = require('./../Controller/authController');
const userController = require('./../Controller/userController');



const router = express.Router();


router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);




module.exports = router;