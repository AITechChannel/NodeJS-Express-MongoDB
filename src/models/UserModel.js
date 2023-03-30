import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_name: String,
  password: String,
});

export const UserModel = mongoose.model("User", schema);
