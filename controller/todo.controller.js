const TodoTask = require("../schemas/todo.schema");

const {
  OK,
  ERROR,
  SUCCESS,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST,
} = require("../constants/global.constants");

const add = async (req, res) => {
  try {
    let body = req.body;
    body.user = req.userId;
    body.duedate = new Date(body.duedate);

    const addTodo = await TodoTask.create(body);
    if (addTodo) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Todo in added",
        data: addTodo,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Todo in not added",
      data: {},
    });
  } catch (err) {
    console.log("TODO ERROR MESSAGE -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    let body = req.body;
    body.duedate = new Date(body.duedate);

    const todoUpdate = await TodoTask.findByIdAndUpdate(id, body, {
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
      status: SUCCESS,
      message: "Todo not updated",
      data: todoUpdate,
    });
  } catch (err) {
    console.log("TODO UPDATE ERROR -->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

const getUsersToDo = async (req, res) => {
  try {
    let condition = {
      user: req.userId,
    };

    if (req.body.date) {
      condition.duedate = new Date(req.body.date);
    }
    // console.log(condition);

    const findTodo = await TodoTask.find(condition).sort({
      createdAt: -1,
    });

    if (findTodo.length > 0) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Get all todo list",
        data: findTodo,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "No todo list",
      data: {},
    });
  } catch (err) {
    console.log("GET TODO LIST ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

const deleteToDo = async (req, res) => {
  try {
    const currentDate = new Date();
    const isoDate =
      currentDate.toISOString().split("T")[0] + "T00:00:00.000+00:00";

    const findTodayToDO = await TodoTask.deleteMany({
      duedate: isoDate,
    });

    if (findTodayToDO) {
      return res.status(OK).json({
        status: SUCCESS,
        message: "Today todo delete",
        data: {},
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Today todo not delete",
      data: {},
    });
  } catch (err) {
    console.log("TODO DELETE ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const findToDo = await TodoTask.findById(id);
    var updateStatus;

    if (findToDo.is_completed) {
      updateStatus = await TodoTask.findByIdAndUpdate(
        id,
        { $set: { is_completed: false } },
        { new: true }
      );
    } else {
      updateStatus = await TodoTask.findByIdAndUpdate(
        id,
        { $set: { is_completed: true } },
        { new: true }
      );
    }

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
      data: {},
    });
  } catch (err) {
    console.log("TODO STATUS CHANGE ERROR --->", err);

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports = {
  add,
  edit,
  getUsersToDo,
  deleteToDo,
  updateStatus,
};
