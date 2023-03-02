import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  categories: [{
    id: String,
    name: String,
  }],
  files: [
    {
      id: String,
      path: String,
      name: String
    }
  ]
});

export const PostModel = mongoose.model("Post", schema);
