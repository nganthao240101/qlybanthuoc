import express from "express";
import bodyParser from "body-parser";

export default {
  setup: () => {
    const app = express();

    // parse application/json
    app.use(express.json());

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    return app;
  },
};
