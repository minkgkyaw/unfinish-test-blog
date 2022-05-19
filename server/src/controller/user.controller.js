const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/User");
const createHttpError = require("http-errors");
const expressAsyncHandler = require("express-async-handler");
const { registerSchema, loginSchema } = require("../utilities/schema.js");

const getById = expressAsyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    // check mongo id
    const mongoId = await mongoose.Types.ObjectId.isValid(id);

    if (!mongoId) return next(createHttpError(404));
    const user = await User.findById(id).populate("posts").exec();

    if (!user) return next(createHttpError(404));

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        softDelete: user.softDelete,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

const getAllUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const users = await User.find().sort({ name: 1, email: 1 });

    if (!users) return next(createHttpError(500));

    if (users.length < 1) return next(createHttpError(404));

    return res.status(200).json([users]);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  getById,
  getAllUser,
};
