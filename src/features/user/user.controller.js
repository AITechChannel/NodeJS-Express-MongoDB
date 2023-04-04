import { UserModel } from './user.model.js';

import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit, perPage = 10 } = req.query;
    const fieldFilter = req.query ? req.query : {};

    UserModel.find(fieldFilter)
      .skip(limit * page - limit)
      .limit(limit)
      .exec((err, users) => {
        UserModel.countDocuments((err, count) => {
          if (err) return;

          res.status(200).json({
            data: users,
            current_page: parseInt(page),
            total_page: Math.ceil(count / perPage)
          });
        });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await UserModel.findByIdAndUpdate(id, user);
    const userUpdated = await UserModel.findById(id);
    res.status(200).json(userUpdated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json('Delete successful');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = new UserModel({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    res.status(200).json('login success');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const refreshToken = async (req, res) => {
  try {
    res.status(200).json('login success');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
