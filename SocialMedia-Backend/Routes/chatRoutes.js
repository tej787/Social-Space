const express = require('express');
const chatController = require('./../Controller/chatController');
const authController = require('./../Controller/authController');



const router = express.Router();

router.post('/', authController.protect,chatController.createChat);
router.get('/myChat', authController.protect, chatController.myChats);
router.get('/:userId', authController.protect, chatController.userChats);
router.delete('/:chatId', authController.protect, chatController.deleteChat);

router.get('/find/:secondId', authController.protect,chatController.findLoginUserChat);
router.get('/find/:firstId/:secondId', chatController.findChat);

module.exports = router;
