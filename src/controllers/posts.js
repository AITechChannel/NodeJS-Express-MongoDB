import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    // const post = new PostModel({
    //   username: "Tuan Anh Doan next",
    //   password: "123",
    // });

    // post.save();

    const posts = await PostModel.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const newPassword = req.body.password;
    await PostModel.findByIdAndUpdate(id, {
      password: newPassword,
    });
    res.status(200).json({ id, newPassword });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndDelete(id);
    res.status(200).json("delete");
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;

    console.log(newPost);

    const post = new PostModel(newPost);

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
