const Joi = require("joi");

const addToDo = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(6).required(),
  duedate: Joi.string().required(),
});

const editTodDo = Joi.object({
  title: Joi.string(),
  description: Joi.string().min(6),
  duedate: Joi.string(),
});

const updateProfileVal = Joi.object({
  password: Joi.string().min(6),
  first_name: Joi.string().min(3).max(30),
  last_name: Joi.string().min(3).max(30),
  mobile: Joi.string().pattern(/^\d{10}$/),
});

module.exports = {
  addToDo,
  editTodDo,
  updateProfileVal,
};
