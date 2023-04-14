import express from "express";
import productController from "../product/productController";
import uploadFile from "../../../middleware/upload";

export const productRouter = express.Router();

productRouter.get("/all-product", productController.handleGetAllProducts);
productRouter.post(
  "/add-product",
  uploadFile.single("photo"),
  productController.handleAddProduct
);
productRouter.delete("/delete", productController.handleDeleteProduct);
productRouter.post("/update-product", productController.handleUpdateProduct);
productRouter.get("/detail-product", productController.handleDetailProduct);
productRouter.get(
  "/getProductListByCategory",
  productController.handleGetProductListByCategory
);
productRouter.get(
  "/getProductById",

  productController.handleGetProductByCategoryById
);
productRouter.post(
  "/upload-img",
  uploadFile.array("file", 10),
  productController.multiplePhotoUpload
);
productRouter.get("/getAllPhotos", productController.handleGetAllPhotos);
productRouter.post(
  "/product-offer",
  uploadFile.single("image"),
  productController.addProductOffer
);
