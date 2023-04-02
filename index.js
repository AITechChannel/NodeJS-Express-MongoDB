import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routerCategory from './src/features/category/category.router.js';
import routerPosts from './src/features/post/post.router.js';
import routerNotes from './src/features/note/note.router.js';
import routerUsers from './src/features/user/user.router.js';
import routerLogout from './src/features/logout/logout.router.js';
import routerUpload from './src/features/upload/upload.router.js';
import routerDownload from './src/features/download/download.router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import formData from 'express-form-data';
import os from 'os';

import verifyTokenMiddleware from './src/middleware/auth.middleware.js';

dotenv.config();
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
const app = express();
const URI = process.env.DATABASE_URL;
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts', verifyTokenMiddleware, routerPosts);
app.use('/logout', verifyTokenMiddleware, routerLogout);
app.use('/users', routerUsers);
app.use('/notes', verifyTokenMiddleware, routerNotes);
app.use('/category', verifyTokenMiddleware, routerCategory);
app.use('/upload', routerUpload);
app.use('/download', routerDownload);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
