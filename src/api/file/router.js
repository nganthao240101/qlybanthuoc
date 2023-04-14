import express from "express";

import uploadFile from "../../../middleware/upload";
import fileController from "./controller";

export const fileRouter = express.Router();

fileRouter.post("/upload", uploadFile.single("file"), fileController.upload);
fileRouter.get("/files", fileController.getListFiles);
fileRouter.get("/files/:name", fileController.download);
