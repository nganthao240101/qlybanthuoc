import express from "express";
import categoryController from "../category/categoryController";
export const categoryRouter = express.Router();

categoryRouter.get("/getAllCategory", categoryController.getCategoryList);
categoryRouter.post(
  "/sub-category/create",
  categoryController.handleCreateSubCategory
);
categoryRouter.post(
  "/child-category/create",
  categoryController.handleCreateChildCategory
);
