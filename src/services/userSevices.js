import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: {
            email: email,
            attributes: {},
          },
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = `OK`),
              delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `user not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isnt exist`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  let data = db.User.findAll();
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.User.findAll({
          attributes: {
            exculude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exculude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: `Email is already in use`,
        });
      }
      let hashPasswordFromBycrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBycrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve({
        errCode: 0,
        message: `OK`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
};
