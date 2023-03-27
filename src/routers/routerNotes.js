import express from 'express';
import {
  getNotes,
  createNote,
  putNotes,
  deleteNote,
  getNoteDetail
} from '../controllers/notes.js';

import uploadMiddleware from '../middleware/uploadMiddleware.js';

const routerNotes = express.Router();

routerNotes.get('/', getNotes);

routerNotes.get('/:id', getNoteDetail);

routerNotes.post('/', uploadMiddleware, createNote);

routerNotes.put('/:id', uploadMiddleware, putNotes);

routerNotes.delete('/:id', deleteNote);

export default routerNotes;
