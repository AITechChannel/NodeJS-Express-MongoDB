import express from "express";

import  uploadMiddleware from "../middleware/uploadMiddleware.js";

import { upload } from "../controllers/upload.js";

const routerDownload = express.Router();

routerDownload.post("/", uploadMiddleware, upload);

export default routerDownload;
