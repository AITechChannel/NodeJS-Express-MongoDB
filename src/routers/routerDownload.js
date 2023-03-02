import express from 'express';

import { download } from '../controllers/download.js';

const routerDownload = express.Router();

routerDownload.get('/:name', download);

export default routerDownload;
