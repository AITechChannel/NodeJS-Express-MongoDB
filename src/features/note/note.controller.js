import { CategoryModel } from '../category/category.model.js';
import { NoteModel } from './note.model.js';

export const getNotes = async (req, res) => {
  try {
    const { page = 1, limit, perPage = 10 } = req.query;

    NoteModel.find({ auth_id: res.locals.auth_id })
      .skip(limit * page - limit)
      .limit(limit)
      .exec((err, notes) => {
        NoteModel.countDocuments((err, count) => {
          if (err) return;

          res.status(200).json({
            data: notes,
            current_page: parseInt(page),
            total_page: Math.ceil(count / perPage)
          });
        });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getNoteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const putNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const note = req.body;
    await NoteModel.findByIdAndUpdate(id, note);
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
    const { category_id } = req.body;
    const categories = await CategoryModel.find()
      .where('_id')
      .in(category_id)
      .exec();
    console.log('🚀 ::: categories:', categories);
    const note = new NoteModel({
      ...req.body,
      auth_id: res.locals.auth_id,
      categories
    });
    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
