const Joi = require("joi");

const userRegisterVal = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  mobile: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
});

const userLoginVal = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  userRegisterVal,
  userLoginVal,
};
