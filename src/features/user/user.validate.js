import { UserModel } from './user.model.js';

import bcrypt from 'bcryptjs';
import { EMAIL_REGEX } from '../../utils/constant.js';

const userMiddleWare = async (req, res, next) => {
  const email = req.body.email;
  if (!EMAIL_REGEX.test(email)) {
    res.status(401).json('Email is required');
  }
  const user = await UserModel.find({ email });
  if (user.length) {
    res.status(401).json('User is existed');
    return;
  }

  next();

  // const token = req.session.token;
  // if (!token) {
  //   return res.status(403).send({
  //     message: 'No token provided!'
  //   });
  // }

  // jwt.verify(token, config.secret, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({
  //       message: 'Unauthorized!'
  //     });
  //   }
  //   req.userId = decoded.id;
  //   next();
  // });
};

export default userMiddleWare;
