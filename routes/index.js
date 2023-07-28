const express = require("express");
const indexRouter = new express.Router();

const { userRouter } = require("./../routes/users.routes");
const { toDoRouter } = require("./todo.routes");

// Users routes.
indexRouter.use("/users", userRouter);

// Todotask routes.
indexRouter.use("/todo", toDoRouter);

module.exports = indexRouter;
