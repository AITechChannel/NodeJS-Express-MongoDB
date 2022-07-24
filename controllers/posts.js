import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    const post = new PostModel({
      username: "Tuan Anh Doan",
    });

    post.save();

    const posts = await PostModel.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = (req, res) => {
  res.send("create post");
};
