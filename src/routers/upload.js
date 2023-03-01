import express from "express";

import  uploadFile from "../middleware/uploadMiddleware.js";

import { upload } from "../controllers/upload.js";

const routerDownload = express.Router();

routerDownload.post("/", uploadFile, upload);

export default routerDownload;
