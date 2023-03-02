import fs from 'fs';

export const download = async (req, res, next) => {
  try {
    fs.readdir('./uploads', (err, files) => {
      const fileName = files.find((file) => file === req.params.name);
      if (!fileName) {
        res.status(404).json('file not found');
        return;
      }
      res.download('./uploads/' + fileName, fileName);
    });
  } catch (error) {}
};
