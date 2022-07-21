const express = require('express');
/* preserve req.params values from the parent router by passing options(margeParams) */
const router = express.Router({ mergeParams: true });

/* Relative imports */
const { getSinglePost, getSingleComment } = require('../middlewares/posts');
const { 
  getComments,
  getComment,
  postComment,
  editComment,
  deleteComment,
  updateLikes,
} = require('../controllers/commentController');

/* Set up comments routes */

/* Get all comments for a post */
router.get('/', getSinglePost, getComments);

/* Get a single comment */
router.get('/:comment_id', getSinglePost, getSingleComment, getComment);

/* Post a comment */
router.post('/', getSinglePost, postComment);

/* Edit a comment */
router.put('/:comment_id', getSinglePost, editComment);

/* Delete a comment */
router.delete('/:comment_id', getSinglePost, deleteComment);

/* Update comment likes */
router.put('/:comment_id/likes', getSinglePost, getSingleComment, updateLikes);

module.exports = router;