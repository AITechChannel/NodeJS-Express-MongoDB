import express from 'express';
import {
  getUsers,
  createUser,
  putUsers,
  deleteUser,
  getUserDetail,
  login,
  refreshToken
} from '../user/user.controller.js';

import userValidate from './user.validate.js';

import {
  verifyUserLoginMiddleware,
  refreshTokenMiddleware
} from './user.authenticate.js';

const routerUser = express.Router();

routerUser.get('/', getUsers);

routerUser.get('/:id', getUserDetail);

routerUser.post('/register', userValidate, createUser);

routerUser.post('/login', verifyUserLoginMiddleware, login);

routerUser.post('/refresh_token', refreshTokenMiddleware, refreshToken);

routerUser.put('/:id', putUsers);

routerUser.delete('/:id', deleteUser);

export default routerUser;
