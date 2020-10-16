const Joi = require('joi');

function pattern(expression) {
  return new RegExp(expression);
}

const userSchema = Joi.object({
  fullname: Joi.string().required().max(25),
  // username string requirements is alphanumeric charactes only.
  username: Joi.string().required().alphanum().min(6).max(15),
  // password should contain 1 uppercase, lowercase, number and a special characters.
  password: Joi.string().required().alphanum().min(8).max(15),
});

module.exports = userSchema;
