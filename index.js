import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routerCategory from './src/routers/routerCategory.js';
import routerPosts from './src/routers/routerPosts.js';
import routerNotes from './src/routers/routerNotes.js';
import routerUpload from './src/routers/upload.js';
import routerDownload from './src/routers/routerDownload.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import formData from 'express-form-data';
import os from 'os';

dotenv.config();
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
const app = express();
const URI =
  'mongodb+srv://TuanAnhDoan:KzKIGohN9ppir8WW@cluster0.eagizdl.mongodb.net/?retryWrites=true&w=majority';
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/posts', routerPosts);
app.use('/note', routerNotes);
app.use('/category', routerCategory);
app.use('/upload', routerUpload);
app.use('/download', routerDownload);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to DB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
