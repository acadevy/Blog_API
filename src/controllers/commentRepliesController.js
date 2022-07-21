/* Relative imports */
const Post = require('../models/post');

/* Get all comments for a post
   expects a get request from the client with no payload
   end-point: "/api/posts/:id/comments"
*/
exports.getComments = async (req, res) => {
  const { comments } = res.post;
  res.json({ comments });
}

/**
 * Get a single comment
 * expects a get request from the client with no payload
 * end-point: "/api/posts/:id/comments/:comment_id"
 */
exports.getComment = (req, res) => {
  res.json(res.comment);
}

/* Post a comment
   expects a post request to the endpoint with payload structure like so: { content: "<insert comment here>" }
   end-point: "/api/posts/:id/comments"
*/
exports.postComment = async (req, res) => {
  // grab content and post id from request object
  const { body: { content }, params: { id }} =  req;
  try {    
    // update post with new comment using the $push array operator
    const updatedPost = await Post.findByIdAndUpdate(
      id, 
      { "$push": { comments: { content } } }, 
      { new: true, useFindAndModify: false }
    );
    // return the post object updated with new comment(s)
    res.json(updatedPost);
  } catch(err) {
    // handle poential errors
    res.status(500).json({message: err.message});
  }
}

/* Edit a comment
   expects a put request from the client with payload structure like so: { content: "<insert edited comment here>" }
   end-point: "/api/posts/:id/comments/:comment_id"
*/
exports.editComment = async (req, res) => {
  // grab the post id and comment id from the route parameters
  const { id, comment_id } = req.params;
  // grab comment from request body
  const { content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$set": { "comments.$[element].content": content }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id }}]}
    );
    // return a json object of the complete post with the comment updated
    res.json(updatedPost);
  } catch(err) {
    // handle poential errors
    res.status(500).json({message: err.message})
  }
}

/* Delete a comment
   expects a delete request from the client with no payload
   end-point: "/api/posts/:id/comments/:comment_id"
*/
exports.deleteComment = async (req, res) => {
  // grab post id and comment id from route params
  const { id, comment_id } = req.params;
  try {
    await Post.findByIdAndUpdate(
      id,
      { "$unset": { "comments.$[element]": "" }},
      { new: true, useFindAndModify: false, arrayFilters: [{ "element._id": { $eq: comment_id}}]}
    );
    
    // remove null values in the array because the $unset array operator replaces the element with null
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { "$pull": { comments: null }},
      { new: true, useFindAndModify: false}
    );
    
    // return a json object of the complete post with the comment updated
    res.json(updatedPost);    
  } catch(err) {
    // handle poential errors
    res.status(500).json({message: err.message})
  }
}

/** Update comment likes
 *  expects a put request from the client with no payload
 * end-point: "/api/posts/;id/coments/:comment_id/likes" 
 */
exports.updateLikes = async (req, res) => {
  // grab post id and comment id from route params
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