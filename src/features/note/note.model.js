import mongoose, { Schema } from 'mongoose';
import { CategoryModel } from '../category/category.model.js';

const schema = new mongoose.Schema({
  title: String,
  content: String,
  auth_id: String,
  categories: { type: Schema.Types.Array, ref: 'Category' }
});

export const NoteModel = mongoose.model('Note', schema);
