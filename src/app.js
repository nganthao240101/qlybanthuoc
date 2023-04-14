import express from "express";
import bodyParser from "body-parser";

export default {
  setup: () => {
    const app = express();

    // const accessLogStream = rfs("access.log", {
    //   interval: "1d",
    //   path: path.join(__dirname, "..", "log"),
    // });
    // app.use(logger(config.app.log, { stream: accessLogStream }));

    // app.use(bodyParser.json({ limit: "50mb" }));
    // app.use(bodyParser.urlencoded({ extended: true }));

    // parse application/json
    app.use(express.json());

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    return app;
  },
};
