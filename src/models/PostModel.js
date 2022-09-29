import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: String,
});

export const PostModel = mongoose.model("Post", schema);
