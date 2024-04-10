const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
  members: {
    type: [String],
    required: [true, 'members Id required!'],
  
  },
  uniqueMembers: {
    type: String,
    unique:[true]
  }
  
},
{timestamps: true}
);

chatSchema.pre('save', function(next) {
this.uniqueMembers = this.members.sort().join(',');
next();
});

const ChatModel = mongoose.model("Chats", chatSchema);
module.exports = ChatModel;

