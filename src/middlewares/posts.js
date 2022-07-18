const Post = require('../models/post');

async function getSinglePost(req, res, next) {
  const { id } = req.params;
  let post;
  try {
    post = await Post.findById(id)
      .populate('media');
    if(post === null) {
      return res.status(404).json({message: 'post doesn\'t exist'});
    }
  } catch(err) {
    res.status(500).json({message: err.message});
  }
  res.post = post;
  next();
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