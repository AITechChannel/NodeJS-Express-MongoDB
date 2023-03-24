import { CategoryModel } from '../models/CategoryModel.js';
import { NoteModel } from '../models/NoteModel.js';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

export const getNotes = async (req, res) => {
  try {
    const { page = 1, limit, perPage = 10 } = req.query;
    const fieldFilter = req.query ? req.query : {};

    NoteModel.find(fieldFilter)
      .skip(limit * page - limit)
      .limit(limit)
      .exec((err, notes) => {
        NoteModel.countDocuments((err, count) => {
          if (err) return;

          res.status(200).json({
            data: notes,
            current_page: page,
            total_page: Math.ceil(count / perPage)
          });
        });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    if (!note) res.status(404).json('Note not found!');

    const { title, category_ids, remove_file_id } = req.body;
    const categories = await CategoryModel.find()
      .where('_id')
      .in(category_ids)
      .exec();

    const fileStorage = note.files ? note.files : [];

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

    await NoteModel.findByIdAndUpdate(id, {
      title,
      categories,
      files
    });

    const noteUpdated = await NoteModel.findById(id);
    res.status(200).json(noteUpdated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    await NoteModel.findByIdAndDelete(id);
    res.status(200).json('Delete successful');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new NoteModel({
      title,
      content
    });
    note.save();

    const newNote = await NoteModel.find();
    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
