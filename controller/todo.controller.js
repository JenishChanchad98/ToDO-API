const TodoTask = require("../schemas/todo.schema");

const {
  OK,
  ERROR,
  SUCCESS,
  DATA_CREATED,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST,
} = require("../constants/global.constants");

exports.add = async (req, res) => {
  try {
    let body = req.body;
    body.user = req.userId;

    const currentDate = new Date();
    body.duedate = new Date(body.duedate);

    currentDate.setHours(0, 0, 0, 0);
    body.duedate.setHours(0, 0, 0, 0);

    if (body.duedate <= currentDate) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "Due date must be in the future.",
      });
    }

    const addTodo = await TodoTask.create(body);
    if (addTodo) {
      return res.status(DATA_CREATED).json({
        status: SUCCESS,
        message: "Todo in added",
        data: addTodo,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Todo in not added",
    });
  } catch (err) {
    // console.log("TODO ERROR MESSAGE -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const todo = await TodoTask.findById(id);

    if (!todo) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "Todo not found",
      });
    }

    if (todo.createdBy.toString() !== userId) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "You are not authorized to update this todo",
      });
    }

    if (updateData.duedate) {
      updateData.duedate = new Date(updateData.duedate);
    }

    const todoUpdate = await TodoTask.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (todoUpdate) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Todo updated",
        data: todoUpdate,
      });
    }

    return res.status(BAD_REQUEST).json({
      status: ERROR,
      message: "Todo not found or could not be updated",
    });
  } catch (err) {
    console.error("TODO UPDATE ERROR -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.getUsersToDo = async (req, res) => {
  try {
    let condition = {
      user: req.userId,
    };

    if (req.body.date) {
      condition.duedate = new Date(req.body.date);
    }

    const findTodo = await TodoTask.find(condition).sort({
      createdAt: -1,
    });

    if (findTodo.length > 0) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "All todo list",
        data: findTodo,
      });
    } else {
      return res.status(OK).json({
        status: SUCCESS,
        message: "No todo list",
      });
    }
  } catch (err) {
    // console.error("GET TODO LIST ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const userId = req.userId;
    const currentDate = new Date();
    const isoDate =
      currentDate.toISOString().split("T")[0] + "T00:00:00.000+00:00";

    const findTodayToDO = await TodoTask.deleteMany({
      duedate: isoDate,
      user: userId,
    });

    if (findTodayToDO) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Today todo delete",
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Today todo not delete",
    });
  } catch (err) {
    // console.log("TODO DELETE ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const findToDo = await TodoTask.findById(id);

    if (!findToDo) {
      return res.status(OK).json({
        status: ERROR,
        message: "Todo not found",
      });
    }

    if (findToDo.createdBy.toString() !== userId) {
      return res.status(OK).json({
        status: ERROR,
        message: "You are not authorized to update the status of this todo",
      });
    }

    const updateStatus = await TodoTask.findByIdAndUpdate(
      id,
      { $set: { is_completed: !findToDo.is_completed } },
      { new: true }
    );

    if (updateStatus) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Todo status updated",
        data: updateStatus,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Todo status not updated",
    });
  } catch (err) {
    // console.error("TODO STATUS CHANGE ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};
