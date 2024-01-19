const FileModel = require("../schemas/file.schema");
const { removeFile } = require("./../helpers/removefile.helper");

const {
  OK,
  ERROR,
  SUCCESS,
  DATA_CREATED,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST,
} = require("../constants/global.constants");

exports.addFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "No files uploaded",
      });
    }

    const userId = req.userId;
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const fileDocument = new FileModel({
      files: filePaths,
      user: userId,
      todoId: req.body.todoId,
    });
    await fileDocument.save();

    return res.status(DATA_CREATED).json({
      status: SUCCESS,
      message: "Files uploaded successfully",
      data: fileDocument,
    });
  } catch (err) {
    // console.error("FILES ERROR MESSAGE -->", err);

    removeFile(req.files.map((file) => file.path));

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.updateFiles = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { todoId } = req.body;

    if (!fileId || !todoId) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "File ID and Todo ID are required",
      });
    }

    const existingFile = await FileModel.findById(fileId);

    if (!existingFile) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "File not found",
      });
    }

    if (req.files && req.files.length > 0) {
      const newFilePaths = req.files.map((file) => `/uploads/${file.filename}`);
      removeFile(existingFile.files);
      existingFile.files = newFilePaths;
      await existingFile.save();

      return res.status(OK).json({
        status: SUCCESS,
        message: "File updated successfully with new files",
        data: existingFile,
      });
    } else {
      return res.status(OK).json({
        status: SUCCESS,
        message: "File not updated as no new files provided",
        data: existingFile,
      });
    }
  } catch (err) {
    // console.error("UPDATE FILES ERROR MESSAGE -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.deleteFiles = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "File ID is required",
      });
    }

    const deletedFile = await FileModel.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "File not found or not deleted",
      });
    }

    removeFile(deletedFile.files);

    return res.status(OK).json({
      status: SUCCESS,
      message: "File deleted successfully",
      data: deletedFile,
    });
  } catch (err) {
    // console.error("DELETE FILES ERROR MESSAGE -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.getToDosFiles = async (req, res) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "Todo ID is required",
      });
    }

    const files = await FileModel.find({ todoId })
      .populate("todoId", "title description duedate")
      .populate("user", "username");

    return res.status(OK).json({
      status: SUCCESS,
      message: "Files fetched successfully",
      data: files,
    });
  } catch (err) {
    // console.error("GET TODOS FILES ERROR MESSAGE -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};
