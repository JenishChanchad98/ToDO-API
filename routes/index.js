const express = require("express");
const indexRouter = new express.Router();

const { userRouter } = require("./../routes/users.routes");
const { toDoRouter } = require("./todo.routes");
const { filesRouter } = require("./files.routes");

// Users routes.
indexRouter.use("/api/users", userRouter);

// Todo task routes.
indexRouter.use("/api/todo", toDoRouter);

// Files routes.
indexRouter.use("/api/files", filesRouter);

module.exports = indexRouter;
