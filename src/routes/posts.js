const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* Relative imports */
const { getSinglePost } = require('../middlewares/posts');
const { 
  getPosts, 
  getPost, 
  createPost, 
  editPost,
  deletePost, 
  updateLikes,
} = require('../controllers/postController');


/** setup posts routes */

/** get all posts */
router.get('/getposts', getPosts);

/** Get one post */
router.get('/:id', getSinglePost, getPost);

/** Create a post */
router.post('/createpost', auth, createPost);

/** Edit a post */
router.put('/:id', auth, editPost);

/** Delete a post */
router.delete('/:id', auth, getSinglePost, deletePost);

/** update likes */
router.put('/:id/likes', getSinglePost, updateLikes);

module.exports = router;