const express = require("express");
const toDoRouter = express.Router();

const errorHandle = require("../helpers/error.helper");
const { userAuth } = require("../middlewares/user.auth.guard");

const {
  add,
  edit,
  getUsersToDo,
  deleteToDo,
  updateStatus,
} = require("../controller/todo.controller");

const { addToDo, editTodDo } = require("../validation_rules/todo.validation");

toDoRouter.post("/add", userAuth, errorHandle(addToDo), add);

toDoRouter.put("/edit/:id", userAuth, errorHandle(editTodDo), edit);

toDoRouter.post("/getuserstodo", userAuth, getUsersToDo);

toDoRouter.delete("/delete", userAuth, deleteToDo);

toDoRouter.put("/updatestatus/:id", userAuth, updateStatus);

module.exports = { toDoRouter };
