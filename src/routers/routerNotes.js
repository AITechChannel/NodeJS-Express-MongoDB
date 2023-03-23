import express from 'express';
import {
  getNotes,
  createNote,
  putNotes,
  deleteNote
} from '../controllers/notes.js';

import uploadMiddleware from '../middleware/uploadMiddleware.js';

const routerNotes = express.Router();

routerNotes.get('/list', getNotes);

routerNotes.post('/list', uploadMiddleware, createNote);

routerNotes.put('/list/:id', uploadMiddleware, putNotes);

routerNotes.delete('/list/:id', deleteNote);

export default routerNotes;
