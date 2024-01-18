const { VALIDATION_CODE, ERROR } = require("../constants/global.constants");

const errorHandle = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    return res.status(VALIDATION_CODE).json({
      status: ERROR,
      message: message,
    });
  }
};
module.exports = errorHandle;
