import express from "express";
import authController from "./authController";
import { localStrategy, jwtStrategy } from "../../../middleware/stratery";
import { sanitize } from "../../../middleware/sanitizer";
import { validateBody, schemas } from "../../../middleware/validator";
const passport = require("passport");
const passportConfig = require("../../../passport");
import path from "path";

export const authRouter = express.Router();
authRouter.post("/register", authController.register);
authRouter
  .route("/login")
  .post(
    sanitize(),
    passport.authenticate("jwt", { session: false }),
    authController.login
  );
authRouter.post("/secret", authController.login);
authRouter.get("/getAllUser", authController.getAllUsers);
authRouter.post("/addUser", authController.addUser);
authRouter.post("/findUser", authController.findUser);
authRouter.post("/updateUser", authController.updateUser);
authRouter.delete("/deleteUser", authController.deleteUser);
