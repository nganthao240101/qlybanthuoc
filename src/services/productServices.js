import db from "../models/index";

let getAllItems = async () => {
  let product = await db.Product.findAll({
    include: {
      model: db.SubCategory,
      attribute: db.SubCategory,
      include: [
        {
          model: db.Category,
          attribute: ["id", "name"],
        },
      ],
    },
    raw: true,
  });

  return new Promise((resolve, reject) => {
    try {
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

let addProduct = async (data) => {
  let item = await db.Product.findOne({
    where: { name: data.name },
    raw: true,
  });
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!item) {
        await db.Product.create({
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
          childCategoryId: data.childCategoryId,
          name: data.name,
          brand: data.brand,
          batch: data.batch,
          expiry: data.expiry,
          qty: data.qty,

          status: data.status,
          unit: data.unit,
          price: data.price,
          discount: data.discount,
          total: data.total,
          photo: req.file ? req.file.location : "",
          description: data.description,
        });
      }
      resolve({
        errCode: 0,
        message: " Add successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = async (id) => {
  let item = await db.Product.findOne({
    where: { id: id },
  });
  if (item) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Product.destroy({ where: { id: item.id } });
        resolve({
          errCode: 0,
          message: "Delete successfully",
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};

let updateProduct = async (id, data) => {
  let item = await db.Product.findOne({
    where: { id: id },
  });
  console.log(item);
  console.log(data);
  if (item) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Product.update(
          {
            categoryId: data.categoryId,
            subCategoryId: data.subCategoryId,
            childCategoryId: data.childCategoryId,
            name: data.name,
            brand: data.brand,
            batch: data.batch,
            expiry: data.expiry,
            qty: data.qty,

            status: data.status,
            unit: data.unit,
            price: data.price,
            discount: data.discount,
            total: data.total,
            photo: data.file ? data.file.location : "",
            description: data.description,
          },
          { where: { id: id } }
        );
        resolve({
          errCode: 0,
          message: "Update successfully",
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};
let detailProduct = async (id) => {
  let product = await db.Product.findOne({
    where: { id: id },
    include: {
      model: db.SubCategory,
      attribute: db.SubCategory,
      include: [
        {
          model: db.Category,
          attribute: ["id", "name"],
        },
      ],
    },
    raw: true,
  });

  return new Promise((resolve, reject) => {
    try {
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

let getProductByCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          // supplierId: data.supplierId,
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
        },
      });
      resolve({
        errCode: 0,
        message: "All Product List",
        res,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getProductByCategoryById = async (id) => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.findAll({
        where: { id: id },
        include: [
          {
            model: db.ProductPhoto,
            attribute: ["id", "imagUrl"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errCode: 0,
        res,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// let handleUserLogin = (email, password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let userData = {};
//       let isExist = await checkUserEmail(email);
//       if (isExist) {
//         let user = await db.User.findOne({
//           where: {
//             email: email,
//             attributes: {},
//           },
//         });
//         if (user) {
//           let check = bcrypt.compareSync(password, user.password);
//           if (check) {
//             (userData.errCode = 0),
//               (userData.errMessage = `OK`),
//               delete user.password;
//             userData.user = user;
//           } else {
//             userData.errCode = 3;
//             userData.errMessage = `wrong password`;
//           }
//         } else {
//           userData.errCode = 2;
//           userData.errMessage = `user not found`;
//         }
//       } else {
//         userData.errCode = 1;
//         userData.errMessage = `Your email isnt exist`;
//       }
//       resolve(userData);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let checkUserEmail = (userEmail) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let user = await db.User.findOne({
//         where: {
//           email: userEmail,
//         },
//       });
//       if (user) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getAllUsers = (userId) => {
//   let data = db.User.findAll();
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = "";
//       if (userId === "ALL") {
//         users = db.User.findAll({
//           attributes: {
//             exculude: ["password"],
//           },
//         });
//       }
//       if (userId && userId !== "ALL") {
//         users = db.User.findOne({
//           where: {
//             id: userId,
//           },
//           attributes: {
//             exculude: ["password"],
//           },
//         });
//       }
//       resolve(users);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let createNewUser = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let check = checkUserEmail(data.email);
//       if (check === true) {
//         resolve({
//           errCode: 1,
//           message: `Email is already in use`,
//         });
//       }
//       let hashPasswordFromBycrypt = await hashUserPassword(data.password);
//       await db.User.create({
//         email: data.email,
//         password: hashPasswordFromBycrypt,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         address: data.address,
//         phoneNumber: data.phoneNumber,
//         gender: data.gender === "1" ? true : false,
//         roleId: data.roleId,
//       });
//       resolve({
//         errCode: 0,
//         message: `OK`,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let hashUserPassword = (password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPassword = await bcrypt.hashSync(password, salt);
//       resolve(hashPassword);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  //   handleUserLogin: handleUserLogin,
  //   getAllUsers: getAllUsers,
  //   createNewUser: createNewUser,
  getAllItems: getAllItems,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  detailProduct: detailProduct,
  getProductByCategory: getProductByCategory,
  getProductByCategoryById: getProductByCategoryById,
};
