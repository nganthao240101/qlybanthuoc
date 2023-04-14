import express from "express";
import authController from "./controllers/auth/authController";
import { authRouter } from "./controllers/auth/authRouter";
import { categoryRouter } from "./controllers/category/categoryRouter";
import { productRouter } from "./controllers/product/productRouter";
import { fileRouter } from "./controllers/file/fileRouter";

export const restRouter = express.Router();
restRouter.use("/user", authRouter);
restRouter.use("/product", productRouter);
restRouter.use("/category", categoryRouter);
restRouter.use("/file", fileRouter);
