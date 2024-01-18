const express = require("express");
const userRouter = express.Router();

const errorHandle = require("../helpers/error.helper");
const userController = require("../controller/users.controller");
const authValidation = require("../validation/auth.validation");

userRouter.post(
  "/signup",
  errorHandle(authValidation.signUpVal),
  userController.signUp
);

userRouter.post(
  "/signin",
  errorHandle(authValidation.signInVal),
  userController.signIn
);

module.exports = { userRouter };
