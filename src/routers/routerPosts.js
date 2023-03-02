import express from 'express';
import {
  getPosts,
  createPost,
  putPosts,
  deletePost
} from '../controllers/posts.js';

import uploadMiddleware from '../middleware/uploadMiddleware.js';

const routerPosts = express.Router();

routerPosts.get('/', getPosts);

routerPosts.post('/', uploadMiddleware, createPost);

routerPosts.put('/:id', uploadMiddleware, putPosts);

routerPosts.delete('/:id', deletePost);

export default routerPosts;
