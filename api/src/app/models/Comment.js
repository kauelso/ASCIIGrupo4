const mongoose = require('../../database'); 
const bcrypt = require('bcryptjs');

const CommentSchema = new mongoose.Schema({
  message: {
    type:String,
    required: true,
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;