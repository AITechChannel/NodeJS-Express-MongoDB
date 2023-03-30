import jwt from 'jsonwebtoken';

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json('token is required');
    }

    jwt.verify(token, 'TAD_SECRECT_KEY', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!'
        });
      }
      res.locals.auth_id = decoded.id;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export default verifyTokenMiddleware;
