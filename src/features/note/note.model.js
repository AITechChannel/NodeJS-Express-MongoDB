import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  content: String,
  auth_id: Number
});

export const NoteModel = mongoose.model('Note', schema);
