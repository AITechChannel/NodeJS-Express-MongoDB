import util from 'util';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
const maxSize = 2 * 1024 * 1024;

// let storage = multer.diskStorage({
//   //   destination: (req, file, cb) => {
//   //     cb(null, __basedir + "/resources/static/assets/uploads/");
//   //   },
//   //   filename: (req, file, cb) => {
//   //     console.log(file.originalname);
//   //     cb(null, file.originalname);
//   //   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  }
});

// let uploadFile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize }
// }).single("file");

const uploadFile = multer({ storage }).array('files', 2);

// let uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFile;
