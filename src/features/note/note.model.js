import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  content: String,
  auth_id: String
});

export const NoteModel = mongoose.model('Note', schema);
