import JWT from "jsonwebtoken";

import db from "../../models/index";
import { createToken } from "./createToken";

const register = async (req, res) => {
  const { firstName, lastName, address, email, phone, verify, password, role } =
    req.body;

  const userFound = await db.User.findOne({ where: { email: email } });

  if (userFound) {
    return res.status(403).json({ success: false, msg: "Email already exist" });
  }

  const passwordHash = bcrypt.hashSync(password);

  const newUser = await db.User.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    phone: phone,
    verify: verify,
    password: passwordHash,
    role,
  });

  const token = createToken({
    firstName,
    lastName,
    address,
    email,
    phone,
    role,
  });

  if (newUser) {
    return res.json({ success: true, msg: "New registration", token });
  }

  return res.status(403).json({ success: false });
};

const login = async (req, res) => {
  const { email: reqEmail } = req.body;

  const user = await db.User.findOne({ where: { email: reqEmail } });
  if (!user) return res.json({ message: "User not found" });

  const { firstName, lastName, address, email, phone, role } = user;

  const token = createToken({
    firstName,
    lastName,
    address,
    email,
    phone,
    role,
  });

  return res.json({ success: true, token });
};

const getAllUsers = async (req, res, next) => {
  db.User.findAll()
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(500).json({
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const addUser = async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, address, email, phone, verify, password } =
    req.body;
  db.User.findOne({ where: { email: email } })
    .then((find) => {
      if (find) {
        res.status(409).json({ msg: "email is already" });
      }
      return db.User.create({
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        phone: phone,
        verify: verify,
        password: password,
      });
    })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          msg: "add successfully",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const findUser = (req, res, next) => {
  db.User.findOne({
    attributes: ["firstName", "lastName"],
    where: {
      email: req.query.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(200).json({ success: true, data: user });
      } else res.status(500).json({ success: false });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { firstName, lastName, address, email, phone, verify, password } =
    req.body;
  db.User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(409).json("Not found user");
      }
      return db.User.update(
        {
          firstName: firstName ? firstName : user.firstName,
          lastName: lastName ? lastName : user.lastName,
          address: address ? address : user.address,
          verify: verify ? verify : user.verify,
          password: password ? password : user.password,
        },
        { where: { id: id } }
      );
    })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          msg: "update successfully",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const deconsteUser = (req, res, next) => {
  db.User.findOne({
    where: { id: req.query.id },
  })
    .then((data) => {
      if (data) {
        return db.User.destroy({
          where: {
            id: req.query.id,
          },
        }).then((r) => [r, data]);
      }
      return res.status(409).json("user not found");
    })
    .then((re) => {
      return res.status(200).json("deconste successfully");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  register: register,
  login: login,
  getAllUsers: getAllUsers,
  addUser: addUser,
  findUser: findUser,
  updateUser: updateUser,
  deconsteUser: deconsteUser,
};
