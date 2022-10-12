import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: String,
  password: String,
});

export const PostModel = mongoose.model("Post", schema);
