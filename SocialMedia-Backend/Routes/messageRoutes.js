const express = require('express');
const messageController = require('./../Controller/messageController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/',authController.protect, messageController.addMessage);

router.get('/:chatId', authController.protect,messageController.getMessages);


module.exports = router;
