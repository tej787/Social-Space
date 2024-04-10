const Message = require('./../Models/messageModel');
const User = require('./../Models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Chat = require('./../Models/chatModel');




exports.addMessage = catchAsync(async (req, res, next) => {
    const { chatId, text } = req.body;
    if(!await Chat.findById(chatId))
    {
      return next(
        new AppError(
          'Chat Id Not Exist Or Chat already delete by other user',
          403
        )
      );
    }
    const message = new Message({
      chatId,
      senderId:req.user.id,
      text,
    });
      const result = await message.save();
      res.status(200).json(result);
    
  });

exports.getMessages = catchAsync(async (req, res, next) => {
    const { chatId } = req.params;
    
      const result = await Message.find({ chatId });
      res.status(200).json(result);
    
  });