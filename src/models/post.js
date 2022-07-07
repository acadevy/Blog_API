const mongoose = require('mongoose');

/* Define database schema for the posts */
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      content: String,
      date: { type: Date, default: Date.now },
      replies: [
        {
          content: String,
          date: { type: Date, default: Date.now }
        }
      ],
      likes: { type: Number, default: 0 }
    }
  ],
  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media'
    }
  ],
  meta: {
    likes: { type: Number, default: 0 },
    tags: { type: Array },
    mediaIds: { type: Array }
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

