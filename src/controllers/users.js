import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const resgister = async (req, res) => {
  try {
    const dataUser = req.body;
    const user = new UserModel(dataUser);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const dataUser = req.body;
    const user = await UserModel.findOne({
      user_name: dataUser.user_name,
      password: dataUser.password,
    });
    if (user) {
      const token = jwt.sign({ _id: user.id }, "test");
      console.log(token);
      res.status(200).json({ message: "success", token: token });
    } else {
      res.status(200).json("Login failed");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
