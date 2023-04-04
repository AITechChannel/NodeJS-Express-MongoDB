import { UserModel } from './user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserReFreshToken } from '../logout/logout.model.js';

export const verifyUserLoginMiddleware = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email
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

    const token = jwt.sign({ id: user.id }, process.env.SECRECT_KEY, {
      expiresIn: '1d' // 1d
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.SECRECT_REFRESH_KEY,
      {
        expiresIn: '30d'
      }
    );

    await new UserReFreshToken({ refresh_token: refreshToken }).save();

    // let authorities = [];
    // const roles = await user.getRoles();
    // for (let i = 0; i < roles.length; i++) {
    //   authorities.push('ROLE_' + roles[i].name.toUpperCase());
    // }
    // req.session.token = token;
    return res.status(200).send({
      status: 'success',
      token: token,
      refresh_token: refreshToken,
      userInfo: { username: user.username, email: user.email, role: user.roles }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const refreshToken = await UserReFreshToken.find({
      refresh_token: req.body.refreshToken
    });

    if (!refreshToken) {
      res.status(401).json('refreshToken is required');
    }

    jwt.verify(
      req.body.refreshToken,
      process.env.SECRECT_REFRESH_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Unauthorized!'
          });
        }
        const newToken = jwt.sign({ id: decoded.id }, process.env.SECRECT_KEY, {
          expiresIn: '1d'
        });
        return res.status(200).json({
          token: newToken
        });
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
