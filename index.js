import bodyParser from "body-parser";
import cors from "cors";

import express from "express";
import routerUser from "./src/routers/routerUser.js";

import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const URI =
  "mongodb+srv://admin:oC7zw4GYl8euaFfH@cluster0.d2b7x.mongodb.net/data?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.get("/", routerUser);
app.post("/resgister", routerUser);
app.post("/login", routerUser);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to DB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
