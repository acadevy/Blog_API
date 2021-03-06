const mongoose = require('mongoose');
const Post = require('../models/post');


exports.getComments = async (req, res) => {
  const { comments } = res.post;
  res.json({ comments });
}

exports.getComment = (req, res) => {
  res.json(res.comment);
}

exports.postComment = async (req, res) => {
  const { body: { content }, params: { id }} =  req;
  try {    
    const updatedPost = await Post.findByIdAndUpdate(mongoose.Types.ObjectId(id),
      { "$push": { comments: { content } } }, 
      { new: true}
    );
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

exports.editComment = async (req, res) => {
  const { id, comment_id } = req.params;
  const { content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$set": { "comments.$[element].content": content }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id }}]}
    );
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}


exports.deleteComment = async (req, res) => {
  const { id, comment_id } = req.params;
  try {
    await Post.findByIdAndUpdate(
      id,
      { "$unset": { "comments.$[element]": "" }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id}}]}
    );
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$pull": { comments: null }},
      { new: true, useFindAndModify: false}
    );
    res.json(updatedPost);    
  } catch(err) {

    res.status(500).json({message: err.message})
  }
}

exports.updateLikes = async (req, res) => {
  const { id, comment_id } = req.params;
  const foundComment = res.comment
  // update the likes field
  const updatedLikes = foundComment.likes + 1;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$set": { "comments.$[element].likes": updatedLikes }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id }}]}
    );
    res.json(updatedPost);
  } catch(err) {
    // handle potential errors
    res.status(500).json({message: err.message});
  }
}

module.exports = exports;