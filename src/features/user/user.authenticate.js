import { UserModel } from './user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const verifyUserMiddleware = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!'
      });
    }
    const token = jwt.sign({ id: user.id }, 'TAD_SECRECT_KEY', {
      expiresIn: '30s' // 10s
    });

    const refreshToken = jwt.sign({ id: user.id }, 'TAD_SECRECT_KEY_REFRESH', {
      expiresIn: '30s'
    });

    console.log('🚀 ::: token:', token);
    // let authorities = [];
    // const roles = await user.getRoles();
    // for (let i = 0; i < roles.length; i++) {
    //   authorities.push('ROLE_' + roles[i].name.toUpperCase());
    // }
    // req.session.token = token;
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
      refresh_token: refreshToken
      //   roles: authorities
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!'
      });
    }
    const token = jwt.sign({ id: user.id }, 'TAD_SECRECT_KEY', {
      expiresIn: '30s' // 10s
    });

    const refreshToken = jwt.sign({ id: user.id }, 'TAD_SECRECT_KEY_REFRESH', {
      expiresIn: '30s'
    });

    console.log('🚀 ::: token:', token);
    // let authorities = [];
    // const roles = await user.getRoles();
    // for (let i = 0; i < roles.length; i++) {
    //   authorities.push('ROLE_' + roles[i].name.toUpperCase());
    // }
    // req.session.token = token;
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      token: token,
      refresh_token: refreshToken
      //   roles: authorities
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
