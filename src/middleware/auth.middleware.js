import jwt from 'jsonwebtoken';

const verifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('🚀 ::: token:', token);

    if (!token) {
      res.status(401).json('token is required');
    }

    jwt.verify(token, 'TAD_SECRECT_KEY', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!'
        });
      }
      // req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export default verifyTokenMiddleware;
