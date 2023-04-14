import db from "../../../models/index";
import JWT from "jsonwebtoken";
import config from "../../../config";

var JWTSign = function (user, date) {
  return JWT.sign(
    {
      sub: user.id,
      iam: user.type,
      iat: date.getTime(),
      exp: new Date().setMinutes(date.getMinutes() + 30),
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};
const register = (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, address, email, phone, verify, password } =
    req.body;

  // //var passwordHash = bcrypt.hashSync(password);
  db.User.findOne({ where: { email: email } })
    .then((find) => {
      if (find) {
        return res
          .status(200)
          .json({ success: false, msg: "Email already exist" });
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
        return res.status(200).json({ success: true, msg: "New registration" });
      } else {
        res.status(500).json({ success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

let login = async (req, res, next) => {
  var date = new Date();
  console.log(date);
  console.log(req.body);
  const username = req.body.email;
  let user = await db.User.findOne({ where: { email: username } });
  console.log(user);
  if (!user) return res.send("Hello");
  // console.log(date);
  const token = JWTSign(user, date);
  res.cookie("XSRF-token", token, {
    expire: new Date().setMinutes(date.getMinutes() + 30),
    httpOnly: true,
  });
  console.log(token);
  return res.json({ token });

  // return res.status(200).json({ success: true, token, role: req.user.role });
};

let getAllUsers = async (req, res, next) => {
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

let addUser = async (req, res, next) => {
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
let findUser = (req, res, next) => {
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
let updateUser = (req, res, next) => {
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
let deleteUser = (req, res, next) => {
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
      return res.status(200).json("delete successfully");
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
  deleteUser: deleteUser,
};
