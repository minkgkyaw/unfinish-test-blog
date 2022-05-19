const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const createHttpError = require("http-errors");
const expressAsyncHandler = require("express-async-handler");
const { registerSchema, loginSchema } = require("../utilities/schema.js");
const jwt = require("jsonwebtoken");
const { jwtSignInAlgo } = require("../config/general");

const cwd = process.cwd();

const login = expressAsyncHandler(async (req, res, next) => {
  try {
    const data = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: data.email });

    if (!user) return next(createHttpError(404, "Invalid email or password!"));

    const matchPwd = await user.comparePassword(data.password);

    if (!matchPwd)
      return next(createHttpError(401, "Invalid email or password"));

    const token = await user.generateToken();

    return res.status(200).json({
      user: {
        rf_token: user.rf_token,
        token,
      },
    });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    return next(err);
  }
});

const register = expressAsyncHandler(async (req, res, next) => {
  try {
    const data = await registerSchema.validateAsync(req.body);

    const existedUser = await User.findOne({ email: data.email });

    if (existedUser) return next(createHttpError(400, "User already existed!"));

    const newUser = await new User(data);

    const saveUser = await newUser.save();

    if (!saveUser) return next(createHttpError(409, "Register not success!"));

    return res.status(200).json({
      meta: {
        message: "Register successful.",
      },
    });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    return next(err);
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return next(createHttpError(401));

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") return next(createHttpError(401));

    if (!token) return next(createHttpError(401));
    const publicKey = fs.readFileSync(
      path.join(cwd, "src", "cert", "jwt", "signInPublic.pub")
    );
    const verifiedToken = await jwt.verify(token, publicKey, {
      algorithms: [jwtSignInAlgo],
    });
    if (!verifiedToken) return next(createHttpError(401));
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
  register,
  verifyUser,
};
