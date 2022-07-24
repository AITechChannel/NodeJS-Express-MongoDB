import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  username: String,
});

export const PostModel = mongoose.model("Post", Schema);
