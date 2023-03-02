export const upload = async (req, res, next) => {
  try {
    if (req.files == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    res.status(200).send({
      message: `Uploaded the file successfully:  + `
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: . ${err}`
    });
  }
};
