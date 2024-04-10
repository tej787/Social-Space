const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

const router = express.Router()

//chaeck user is login or not
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword); 
router.get('/me', userController.getMe, userController.getUser);
router.delete('/deactivateMe', userController.deactivateMe);
router.patch('/updateMe',    userController.updateMe );
router.get('/',userController.getAllUsers);
router.get('/:id', userController.getUser);
router.get('/:id/follow', userController.followUser)
router.get('/:id/unfollow', userController.unfollowUser)

//check if user is admin or not
router.use(authController.restrictTo());
router.patch('/:id',userController.getMe, userController.updateUser);
router.delete('/:id', userController.getMe,userController.deleteUser)





module.exports = router;