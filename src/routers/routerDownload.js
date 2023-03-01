import express from "express";

import { download } from "../controllers/download.js";

const routerDownload = express.Router();

routerDownload.get("/:id", download);

export default routerDownload;
