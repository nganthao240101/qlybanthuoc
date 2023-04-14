import express from "express";

import cors from "cors";
require("dotenv").config();

import appManager from "./app.js";
import connectDB from "./config/connectDB";
import { restRouter } from "./api/index.js";
import { swaggerDoc } from "./docs/swaggerDoc.js";

const app = appManager.setup();

app.use(express.static(`${__dirname}/public`));

swaggerDoc(app);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api", restRouter);

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port : " + port);
});
