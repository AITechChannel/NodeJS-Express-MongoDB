import express from 'express';
import {
  getPosts,
  createPost,
  putPosts,
  deletePost
} from './post.controller.js';

import uploadMiddleware from '../../middleware/upload.middleware.js';

const routerPosts = express.Router();

routerPosts.get('/', getPosts);

routerPosts.post('/', uploadMiddleware, createPost);

routerPosts.put('/:id', uploadMiddleware, putPosts);

routerPosts.delete('/:id', deletePost);

export default routerPosts;
