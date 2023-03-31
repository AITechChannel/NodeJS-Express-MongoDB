import { logout } from './logout.controller.js';
import express from 'express';

const routerUser = express.Router();

routerUser.post('/', logout);

export default routerUser;
