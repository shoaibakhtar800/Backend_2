const express = require('express');
const router = express.Router();

// Controllers
const { createPost, getAllPosts } = require('../controllers/postController');
const { createComment } = require('../controllers/commentController');
const { makeLike, unlike } = require('../controllers/likeController');

// Routes
router.post('/posts/create', createPost);
router.post('/comments/create', createComment);
router.get('/posts/:id', getAllPosts); // get all posts by id
// router.get('/posts', getAllPosts); // get all posts
router.post('/likes/like', makeLike);
router.post('/likes/unlike', unlike);


module.exports = router;