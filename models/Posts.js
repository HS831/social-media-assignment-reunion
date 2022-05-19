const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  body: {
    type: String, 
    required: true
  },
  user: {
    type: ObjectId, 
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  likes: [{
    type: ObjectId, 
    ref: 'User'
  }],
  comments: [{
    comment: String,
    createdAt: {type: Date, default: Date.now()},
    commenter: {type: ObjectId, ref: 'User'}
  }]
}, {timestamps: true});


module.exports = mongoose.model('Post', postSchema, 'posts');