import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: String,
});

export const PostModel = mongoose.model("Post", schema);
