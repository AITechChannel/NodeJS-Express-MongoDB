import { CategoryModel } from '../models/CategoryModel.js';
import { PostModel } from '../models/PostModel.js';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit, perPage = 10 } = req.query;
    const fieldFilter = req.query ? req.query : {};

    PostModel.find(fieldFilter)
      .skip(limit * page - limit)
      .limit(limit)
      .exec((err, posts) => {
        PostModel.countDocuments((err, count) => {
          if (err) return;

          res.status(200).json({
            data: posts,
            current_page: page,
            total_page: Math.ceil(count / perPage)
          });
        });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putPosts = async (req, res) => {
  // try {
  // fs.readdir('./uploads', (err, files) => {
  //   console.log('🚀 ::::: fs.readdir ::::: files:', files);
  //   // const fileName = files.find((file) => file === req.params.name);
  //   // if (!fileName) {
  //   //   res.status(404).json('file not found');
  //   //   return;
  // });
  const remove_file_id = req.body.remove_file_id;

  const { id } = req.params;
  // const title = req.body.title;
  // const category_id = req.body.category_id;
  // const remove_file_id = req.body.remove_file_id;
  // const category = await CategoryModel.findById(category_id);

  const post = await PostModel.findById(id);

  post.files.forEach((file) => {
    if (file._id.toString() !== remove_file_id) return;
    console.log(file.name);
    fs.unlinkSync('./uploads/imgtest.png');
    // if (fs.exists(file.name)) {
    // }
  });
  // const files = req.files.map((item) => {
  //   return {
  //     name: uuidv4() + item.originalname,
  //     path: item.path
  //   };
  // });
  // const data = {
  //   title,
  //   categories: [category],
  //   files
  // };
  // const post = await PostModel.findByIdAndUpdate(id, data);
  await PostModel.findById(id);
  res.status(200).json(post);
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndDelete(id);
    res.status(200).json('Delete successful');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const title = req.body.title;
    const category_id = req.body.category_id;
    const category = await CategoryModel.findById(category_id);
    const files = req.files.map((item) => {
      return {
        name: uuidv4() + item.originalname,
        path: item.path
      };
    });
    const post = new PostModel({
      title,
      categories: [category],
      files: files
    });
    post.save();
    const newPost = await PostModel.find();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
