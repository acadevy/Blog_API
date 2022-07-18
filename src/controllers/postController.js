const mongoose = require('mongoose');
const Post = require('../models/post');
const Media = require('../models/media');
const User = require('../models/User');


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}

exports.getPost = (req, res) => {
  res.json(res.post);
}

exports.createPost = async (req, res) => {
  const { body, body: { meta: { mediaIds, authorId } }} = req;

  const post = new Post(body);
  try {
    if(mediaIds.length >= 1) {       
      for(let i = 0; i < mediaIds.length; i++) {
        const media = await Media.findById(mongoose.Types.ObjectId(mediaIds[i]));
        if(media === null) {
          return res.status(404).json({message: 'media doesn\'t exist'});
        }      
        post.media.push(media);
      }
    }
    const user = await User.findById(mongoose.Types.ObjectId(authorId));
    if(user === null) return res.status(404).json({message: 'user not found'});
    post.author = { id: user._id, username: user.username };
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({message: err.message});
  }
}


exports.editPost = async (req, res) => {
  const { body, params: { id } } = req;

  body.title = req.sanitize(body.title);
  body.content = req.sanitize(body.content);
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false});
    res.json(updatedPost);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
}


exports.deletePost = (req, res) => {
  try {
    res.post.remove();
    res.json({message: 'successfully deleted post'});
  } catch(err) {
    res.status(500).json(err.message);
  }
}

exports.updateLikes = async (req, res) => {
  const { id } = req.params;
  const { meta: { likes } } = res.post;
  const updatedLikes = {'meta.likes': likes + 1};

  try {
    const update = await Post.findByIdAndUpdate(id, {$set: updatedLikes}, {new: true, useFindAndModify: false});
    res.json(update);
  } catch(err) {
    res.status(500).json(err.message); 
  }
}

module.exports = exports;

