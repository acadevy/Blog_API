const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  image: { type: Buffer },
  slug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);