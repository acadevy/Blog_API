const Post = require('../models/post');
const mongoose = require('mongoose');

async function getSinglePost(req, res, next) {
  const { id } = req.params;
  let post;
  try {
    post = await Post.findById(id)
      .populate('media');
    if(post === null) {
      return res.status(404).json({message: 'post doesn\'t exist'});
    }
    res.post = post;
    next();
  } catch(err) {
    res.status(500).json({message: err.message});
  }
  
}

function getSingleComment(req, res, next) {
  const { comments } = res.post;
  const { comment_id } = req.params;
  const foundComment = comments.find(comment => comment !== null && comment._id == comment_id);
  if(foundComment !== undefined) {
    res.comment = foundComment;
  } else res.status(404).json({message: "comment does not exist"});
  next();
}

module.exports = {
  getSinglePost,
  getSingleComment
}