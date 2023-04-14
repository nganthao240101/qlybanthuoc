import appManager from "./app.js";
// import initWebRoutes from "./route/web";
import { restRouter } from "./api/index.js";
import connectDB from "./config/connectDB";
import { config } from "dotenv";
const morgan = require("morgan");
import express from "express";
import cors from "cors";

import { swaggerDoc } from "./docs/swaggerDoc.js";

// import options from "../src/docs/basicInfo";

require("dotenv").config();

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
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", true);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   next();
// });
app.use("/api", restRouter);

connectDB();

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});
