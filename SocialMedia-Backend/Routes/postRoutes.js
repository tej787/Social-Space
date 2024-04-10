const express = require('express');
const postController = require('./../Controller/postController');
const authController = require('./../Controller/authController');

const router = express.Router()

//chaeck user is login or not
router.use(authController.protect);
router.post('/',authController.protect,postController.createPost)
router.get('/timeline', postController.getMyTimelinePosts)
router.get('/myPost', postController.getMyPosts)
router.get('/:id', postController.getPost)
router.patch('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.get('/:id/like', postController.likePost)
router.get('/:id/timeline', postController.getTimelinePosts)
router.get('/:id/posts', postController.getPosts)







module.exports = router;