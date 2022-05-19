const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const {
  founderMail,
  jwtRefreshAlgo,
  jwtSignInAlgo,
  rounds,
} = require("../config/general");

const cwd = process.cwd();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
    },
    avatar: {
      type: String,
      default: "avatar.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Super_Admin", "Founder"],
      default: "User",
    },
    rf_token: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
    softDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.role;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(rounds);
    this.password = await bcrypt.hash(this.password, salt);
    if (this.email === founderMail) this.role = "Founder";
    const payload = {
      email: this.email,
    };
    const privateKey = fs.readFileSync(
      path.join(cwd, "src", "cert", "jwt", "refresh.key")
    );

    this.rf_token = await jwt.sign(payload, privateKey, {
      algorithm: jwtRefreshAlgo,
      expiresIn: "1y",
    });
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (txt) {
  try {
    return await bcrypt.compare(txt, this.password);
  } catch (err) {
    return new Error(err);
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const payload = {
      id: this.id,
    };
    const privateKey = fs.readFileSync(
      path.join(cwd, "src", "cert", "jwt", "signInPrivate.key")
    );

    return await jwt.sign(payload, privateKey, {
      expiresIn: "1 days",
      algorithm: jwtSignInAlgo,
    });
  } catch (err) {
    return new Error(err);
  }
};

module.exports = mongoose.model("User", userSchema);
