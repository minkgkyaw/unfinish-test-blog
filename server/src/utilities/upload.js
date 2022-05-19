const multer = require("multer");
const consola = require("consola");
const path = require("path");

const cwd = process.cwd();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd, "public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e1);
    cb(null, path.parse(file.originalname).name + "_" + uniqueSuffix + "_" + path.extname(file.originalname));
  },
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd, "public/avatars"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e1);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5e6, // 5mb
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 2e6, // 2mb
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
        return callback(new Error("Only images are allowed"));
      }
      callback(null, true);
    },
  },
});

module.exports = {
  uploadImage,
  uploadAvatar,
};
