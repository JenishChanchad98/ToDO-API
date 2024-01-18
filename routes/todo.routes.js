const express = require("express");
const toDoRouter = express.Router();

const errorHandle = require("../helpers/error.helper");
const { userAuth } = require("../middlewares/user.auth.middlewares");

const todoController = require("../controller/todo.controller");
const todoValidation = require("../validation/todo.validation");

toDoRouter.post(
  "/add",
  userAuth,
  errorHandle(todoValidation.addToDo),
  todoController.add
);

toDoRouter.put(
  "/edit/:id",
  userAuth,
  errorHandle(todoValidation.editTodDo),
  todoController.edit
);

toDoRouter.get("/getuserstodo", userAuth, todoController.getUsersToDo);

toDoRouter.delete("/delete", userAuth, todoController.deleteToDo);

toDoRouter.put("/updatestatus/:id", userAuth, todoController.updateStatus);

module.exports = { toDoRouter };
