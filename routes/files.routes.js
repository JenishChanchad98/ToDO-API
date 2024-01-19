const express = require("express");
const filesRouter = express.Router();

const { userAuth } = require("../middlewares/user.auth.middlewares");
const filesController = require("../controller/file.controller");
const { upload } = require("../middlewares/fileupload.middlewares");

filesRouter.post(
  "/add",
  userAuth,
  upload.array("files"),
  filesController.addFiles
);

filesRouter.put(
  "/update/:fileId",
  userAuth,
  upload.array("files"),
  filesController.updateFiles
);

filesRouter.delete("/delete/:fileId", userAuth, filesController.deleteFiles);

filesRouter.get("/getToDos/:todoId", userAuth, filesController.getToDosFiles);

module.exports = { filesRouter };
