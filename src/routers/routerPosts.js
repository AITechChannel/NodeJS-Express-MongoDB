import express from "express";
import {
  getPosts,
  createPost,
  putPosts,
  deletePost,
} from "../controllers/posts.js";

const routerPosts = express.Router();

routerPosts.get("/", getPosts);

routerPosts.post("/", createPost);

routerPosts.put("/:id", putPosts);

routerPosts.delete("/:id", deletePost);

export default routerPosts;
