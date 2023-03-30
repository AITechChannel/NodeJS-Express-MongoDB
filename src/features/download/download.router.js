import express from 'express';

import { download } from './download.controller.js';

const routerDownload = express.Router();

routerDownload.get('/:name', download);

export default routerDownload;
