import { CategoryModel } from '../category/category.model.js';
import { PostModel } from './post.model.js';
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
  try {
    // fs.readdir('./uploads', (err, files) => {
    //   console.log('🚀 ::::: fs.readdir ::::: files:', files);
    //   // const fileName = files.find((file) => file === req.params.name);
    //   // if (!fileName) {
    //   //   res.status(404).json('file not found');
    //   //   return;
    // });

    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (!post) res.status(404).json('Post not found!');

    const { title, category_ids, remove_file_id } = req.body;
    const categories = await CategoryModel.find()
      .where('_id')
      .in(category_ids)
      .exec();

    const fileStorage = post.files ? post.files : [];

    const fileRemains = fileStorage.map((file) => {
      if (file._id.toString() !== remove_file_id) return;

      if (fs.existsSync(file.name)) {
        fs.unlinkSync(`./uploads/${file.name}`);
        return;
      }
    });

    const fileRemainsRemoveUndefined = fileRemains.filter(
      (file) => file !== undefined
    );

    const fileUploads = req.files.map((item) => {
      return {
        name: item.originalname,
        path: item.path
      };
    });

    const files = fileRemainsRemoveUndefined.concat(fileUploads);

    await PostModel.findByIdAndUpdate(id, {
      title,
      categories,
      files
    });

    const postUpdated = await PostModel.findById(id);
    res.status(200).json(postUpdated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
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
    const { title, category_ids } = req.body;

    const categories = await CategoryModel.find()
      .where('_id')
      .in(category_ids)
      .exec();

    const files = req.files.map((item) => {
      return {
        name: item.originalname,
        path: item.path
      };
    });
    const post = new PostModel({
      title,
      categories,
      files
    });
    post.save();

    const newPost = await PostModel.find();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
