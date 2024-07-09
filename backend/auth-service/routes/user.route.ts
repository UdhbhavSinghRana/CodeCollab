import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updatePassword,
  updateUserInfo,
} from "../controller/user.controller";
import { isAutheticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout",isAutheticated, logoutUser);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.put("/update-user-info",isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updatePassword);


export default userRouter;
