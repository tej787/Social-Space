const Chat = require('./../Models/chatModel');
const Message = require('./../Models/messageModel');

const User = require('./../Models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createChat = catchAsync(async (req, res, next) => {
    if(!req.body.receiverId){
        return next(
          new AppError(
            'The receiver Id is not provided',
            403
          )
        );
    }

    const receiver = await User.findById(req.body.receiverId);
    if (!receiver) {
        return next(
          new AppError(
            'The receiver does not exist',
            404
          )
        );
    }

    const newChat = new Chat({
      members: [req.user.id, req.body.receiverId],
    });
    
    const result = await newChat.save();
    res.status(201).json(result);
});


exports.userChats = catchAsync(async (req, res, next) => {
      const chat = await Chat.find({
        members: { $in: [req.params.userId] },
      });
      if (!chat) {
        return next(
          new AppError(
            `Can't able to find chat`,
            404
          )
        );
    }
      res.status(200).json(chat);
    
  });

  exports.myChats = catchAsync(async (req, res, next) => {
  
    const chat = await Chat.find({
      members: { $in: [req.user.id] },
    });

    if (!chat) {
      return next(
        new AppError(
          `Can't able to find chat`,
          404
        )
      );
  }
    res.status(200).json(chat);
  
});


exports.findChat = catchAsync(async (req, res, next) => {
      const chat = await Chat.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });

      if (!chat) {
        return next(
          new AppError(
            `Can't able to find chat`,
            404
          )
        );
    }
      res.status(200).json(chat)
    
  });

  exports.findLoginUserChat = catchAsync(async (req, res, next) => {
    const chat = await Chat.findOne({
      members: { $all: [req.user.id, req.params.secondId] },
    });

    if (!chat) {
      return next(
        new AppError(
          `Can't able to find chat`,
          404
        )
      );
  }
    res.status(200).json(chat)
  
});

exports.deleteChat = catchAsync(async (req, res, next) => {
  console.log(req.params.chatId)
  await Chat.findByIdAndDelete(req.params.chatId);
  await Message.deleteMany({chatId: req.params.chatId});
  res.status(204).json({
    status: 'success',
    data: null
  });
});
