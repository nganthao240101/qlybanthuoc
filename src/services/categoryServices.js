import db from "../models/index";

let getAllItems = async () => {
  let product = await db.Category.findAll({
    attributes: ["id", "name"],
    include: [{ model: db.SubCategory }],
  });
  console.log("hell");

  return new Promise((resolve, reject) => {
    try {
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  //   handleUserLogin: handleUserLogin,
  //   getAllUsers: getAllUsers,
  //   createNewUser: createNewUser,
  getAllItems: getAllItems,
};
