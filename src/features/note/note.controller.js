import { NoteModel } from './note.model.js';

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
    const { title, content } = req.body;
    const note = new NoteModel({
      title,
      content
    });
    await note.save();

    const newNote = await NoteModel.find();
    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
