const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    authorNickname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model('comment', commentSchema);
