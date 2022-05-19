const expressAsyncHandler = require("express-async-handler");
const { createBlogSchema } = require("./schema");

const createBlogValidator = async (req, res, next) => {
  try {
    await createBlogSchema.validateAsync(req.body)
  return next();
  } catch (err) {
    if(err.isJoi) return err.status = 422;
    return next(err)
  }
}

module.exports = {createBlogValidator}