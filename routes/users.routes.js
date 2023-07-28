const express = require("express");
const userRouter = express.Router();

const errorHandle = require("../helpers/error.helper");
const { userAuth } = require("../middlewares/user.auth.guard");

const { register, login } = require("../controller/users.controller");

const {
  userLoginVal,
  userRegisterVal,
} = require("../validation_rules/auth.validation");

userRouter.post("/register", errorHandle(userRegisterVal), register);

userRouter.post("/login", errorHandle(userLoginVal), login);

module.exports = { userRouter };
