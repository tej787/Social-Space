const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: String,  required: [true, 'userId required!'], },
    desc: String,
    likes: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model('Posts', postSchema); 
module.exports = PostModel;
