import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/database");

const Schema = mongoose.Schema;

const account = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "account",
  }
);

const AccountsModel = mongoose.model("account", account);

AccountsModel.create({ username: "anh" }).then((data) => console.log(data));
