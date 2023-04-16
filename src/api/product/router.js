import express from "express";
import productController from "./controller";
import uploadFile from "../../middleware/upload";
import { allowRolesMiddleware } from "../../middleware/allowRoles";
import { ROLES } from "../../constants";

export const productRouter = express.Router();

// chỉ gửi guest khi không ai login.
productRouter.get(
  "/all-product",
  allowRolesMiddleware([
    ROLES.ADMIN,
    ROLES.EMPLOYEE,
    ROLES.CUSTOMER,
    ROLES.GUEST,
  ]),
  productController.handleGetAllProducts
);
productRouter.post(
  "/add-product",
  allowRolesMiddleware([ROLES.ADMIN, ROLES.EMPLOYEE]),
  uploadFile.single("photo"),
  productController.handleAddProduct
);
productRouter.get(
  "/get-stamples",
  allowRolesMiddleware([
    ROLES.ADMIN,
    ROLES.EMPLOYEE,
    ROLES.CUSTOMER,
    ROLES.GUEST,
  ]),
  productController.getStamples
);
// productRouter.delete("/delete", productController.handleDeleteProduct);
// productRouter.post("/update-product", productController.handleUpdateProduct);
// productRouter.get("/detail-product", productController.handleDetailProduct);
// productRouter.get(
//   "/getProductListByCategory",
//   productController.handleGetProductListByCategory
// );
// productRouter.get(
//   "/getProductById",

//   productController.handleGetProductByCategoryById
// );
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
