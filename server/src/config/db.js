const { default: mongoose } = require("mongoose");
const consola = require("consola");
require("dotenv").config();

const dbUrl =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/science-knowledge";

mongoose
  .connect(dbUrl)
  .then(() => consola.success("Successfully connected to MongoDB ❤️"))
  .catch((err) =>
    consola.error(`Can't connected to MongoDB. Error may be ${err.message}`)
  );
