const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).max(60).required(),
});

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).max(60).required(),
  confirmPassword: Joi.string()
    .min(6)
    .max(60)
    .required()
    .valid(Joi.ref("password")),
});

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().required(),
  postBy: Joi.string().required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  createBlogSchema,
};
