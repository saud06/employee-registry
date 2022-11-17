const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    commentedBy: {
      id: mongoose.Types.ObjectId,
      name: String,
    },
    commentedTo: {
      id: mongoose.Types.ObjectId,
      name: String,
    },
    datetime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
