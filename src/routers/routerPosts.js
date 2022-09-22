import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const routerPosts = express.Router();

routerPosts.get("/", getPosts);

routerPosts.post("/", createPost);

export default routerPosts;
