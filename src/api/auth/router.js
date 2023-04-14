import express from "express";
import passport from "passport";

import authController from "./controller";

export const authRouter = express.Router();
authRouter.post("/register", authController.register);
authRouter.route("/login").post(authController.login);
authRouter.post("/secret", authController.login);
authRouter.get("/getAllUser", authController.getAllUsers);
authRouter.post("/addUser", authController.addUser);
authRouter.post("/findUser", authController.findUser);
authRouter.post("/updateUser", authController.updateUser);
// authRouter.delete("/deleteUser", authController.deleteUser);
