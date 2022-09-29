import express from "express";
import { getPosts, createPost, putPosts } from "../controllers/posts.js";

const routerPosts = express.Router();

routerPosts.get("/", getPosts);

routerPosts.post("/", createPost);

routerPosts.put("/:id", putPosts);

export default routerPosts;
