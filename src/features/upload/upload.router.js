import express from 'express';

import uploadMiddleware from '../../middleware/upload.middleware.js';

import { upload } from './upload.controller.js';

const routerDownload = express.Router();

routerDownload.post('/', uploadMiddleware, upload);

export default routerDownload;
