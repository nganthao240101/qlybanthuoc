import express from "express";
import { authRouter } from "./auth/router";
import { categoryRouter } from "./category/router";
import { productRouter } from "./product/router";
import { fileRouter } from "./file/router";

export const restRouter = express.Router();
restRouter.use("/user", authRouter);
restRouter.use("/product", productRouter);
restRouter.use("/category", categoryRouter);
restRouter.use("/file", fileRouter);
