import bodyParser from "body-parser";
import cors from "cors";

import express from "express";
import routerPosts from "./src/routers/routerPosts.js";

import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const URI =
  "mongodb+srv://admin:oC7zw4GYl8euaFfH@cluster0.d2b7x.mongodb.net/data?retryWrites=true&w=majority";
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.get("/", routerPosts);
app.post("/", routerPosts);
app.put("/:id", routerPosts);
app.delete("/:id", routerPosts);

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
