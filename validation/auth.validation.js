const Joi = require("joi");

exports.signUpVal = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  mobile: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
});

exports.signInVal = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
