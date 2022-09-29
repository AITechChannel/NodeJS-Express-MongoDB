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
    const id = await req.params.id;

    console.log("id", id);

    const newPassword = await req.body.password;

    console.log("pass", newPassword);

    PostModel.findByIdAndUpdate(id, {
      password: "ssdf",
    });

    res.status(200).json("update");
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
