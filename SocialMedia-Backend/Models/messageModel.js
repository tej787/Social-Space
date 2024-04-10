const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
      chatId: {
        type: String,
        required: [true, 'chatId required!'],
      },
      senderId: {
        type: String,
        required: [true, 'senderId required!'],
      },
      text: {
        type: String,
        required: [true, 'Enter Any Message!'],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const MessageModel = mongoose.model("Message", messageSchema);
module.exports = MessageModel;
