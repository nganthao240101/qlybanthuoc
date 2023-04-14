import productServices from "../../../services/productServices";
import db from "../../../models/index";

let handleGetAllProducts = async (req, res) => {
  let products = await productServices.getAllItems();
  return res.status(200).json({
    errMessage: `Ok`,
    products,
  });
};
let handleAddProduct = async (req, res, next) => {
  const {
    categoryId,
    subCategoryId,
    childCategoryId,
    name,
    brand,
    batch,
    status,
    unit,
    expiry,
    price,
    qty,
    discount,
    total,
    description,
  } = req.body;
  console.log(req.body);

  // let product = await productServices.addProduct(req.body);
  db.Product.findOne({
    where: { name: name },
  })
    .then((product) => {
      if (!product) {
        return db.Product.create({
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          childCategoryId: childCategoryId,
          status: parseInt(status) ? "active" : "inactive",
          name: name,
          batch: batch,
          brand: brand,
          unit: unit,
          expiry: expiry,
          price: price,
          qty: qty,
          discount: discount,
          total: total,
          photo: req.file ? req.file.path : "",
          description: description,
        });
      }
    })
    .then((product) => {
      res
        .status(200)
        .json({ success: true, msg: "Successfully inserted product" });
    })
    .catch(function (err) {
      next(err);
    });
};

let handleDeleteProduct = async (req, res) => {
  console.log(req.query.id);
  let data = await productServices.deleteProduct(req.query.id);
  return res.status(200).json({
    errMessage: `Ok`,
    data,
  });
};

let handleUpdateProduct = async (req, res) => {
  console.log(req.query.id);
  console.log(req.body);
  let data = await productServices.updateProduct(req.query.id, req.body);
  return res.status(200).json({
    errMessage: `Ok`,
    data,
  });
};

let handleGetProductListByCategory = async (req, res, next) => {
  console.log(req.query);
  db.Product.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      categoryId: req.query.category,
      subCategoryId: req.query.subcategory,
      // childCategoryId: req.query.childcategory,
    },
  })
    .then((list) => {
      res.status(200).json({
        success: true,
        data: list,
      });
    })
    .catch((err) => {
      next(err);
    });
};

let handleDetailProduct = async (req, res) => {
  let data = await productServices.detailProduct(req.query.id);

  return res.status(200).json({
    errMessage: `Detail product`,
    data,
  });
};

let handleGetProductByCategoryById = async (req, res, next) => {
  let data = await productServices.getProductByCategoryById(req.query);
};

let multiplePhotoUpload = async (req, res, next) => {
  let attachmentEntries = [];
  console.log(req.files);
  var productId = req.body.productId;
  for (var i = 0; i < req.files.length; i++) {
    attachmentEntries.push({
      productId: productId,
      name: req.files[i].originalname,
      mime: req.files[i].mimetype,
      imgUrl: req.files[i].destination,
    });
  }
  console.log(attachmentEntries);

  db.ProductPhoto.findOne({
    where: { productId: productId },
  })
    .then((item) => {
      if (item) {
        attachmentEntries.forEach((element) => {
          db.ProductPhoto.create({
            productId: productId,
            imgUrl: element.imgUrl,
          });
        });
        return res
          .status(200)
          .json({ success: true, msg: "Successfully inserted product" });
      }
    })

    .catch(function (err) {
      next(err);
    });
};
let handleGetAllPhotos = (req, res, next) => {
  db.Product.findAll({
    attributes: ["id", "name", "brand"],
    include: {
      model: db.ProductPhoto,
      attribute: ["id", "imgUrl"],
    },
    raw: true,
  })
    .then((data) => {
      console.log(data);
      res.status(200).json({ success: true, data });
    })
    .catch(function (err) {
      next(err);
    });
};

let addProductOffer = async (req, res, next) => {
  const { productId, qty, discount_per, discount_price, total, net_price } =
    req.body;
  console.log(req.body);
  console.log(req.file);
  // db.ProductOffer.findOne({ where: { id: productId } })
  //   .then((list) => {
  //     if (!list) {
  //       return db.ProductOffer.create({
  //         productId: productId,
  //         image: req.file ? req.file.path : "",
  //         qty: qty,
  //         discount_per: discount_per,
  //         discount_price: discount_price,
  //         total: total,
  //         net_price: net_price,
  //       });
  //     } else {
  //       return db.ProductOffer
  //         .update
  //         //   {
  //         //     qty: qty,
  //         //     discount_per: discount_per,
  //         //     discount_price: discount_price,
  //         //     total: total,
  //         //     net_price: net_price,
  //         //   },
  //         //   { where: { id: list.id } }
  //         ();
  //     }
  //   })
  //   .then((p) => {
  //     res.status(200).json({ success: true, msg: "Successfully" });
  //   })
  //   .catch(function (err) {
  //     next(err);
  //   });
};
module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleAddProduct: handleAddProduct,
  handleDeleteProduct: handleDeleteProduct,
  handleUpdateProduct: handleUpdateProduct,
  handleDetailProduct: handleDetailProduct,
  handleGetProductListByCategory: handleGetProductListByCategory,
  handleGetProductByCategoryById: handleGetProductByCategoryById,
  multiplePhotoUpload: multiplePhotoUpload,
  handleGetAllPhotos: handleGetAllPhotos,
  addProductOffer: addProductOffer,
};
