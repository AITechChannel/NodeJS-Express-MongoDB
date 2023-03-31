import express from "express";
import { getUsers, resgister, login } from "../controllers/users.js";

const routerUser = express.Router();

routerUser.get("/", getUsers);

routerUser.post("/resgister", resgister);
routerUser.post("/login", login);

export default routerUser;
