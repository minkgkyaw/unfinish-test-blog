const http = require("http");
const express = require("express");
const { port } = require("./config/general");
const fs = require("fs");
const path = require("path");
const consola = require("consola");
const cors = require("cors");
const helmet = require("helmet");
const cwd = process.cwd();
const logger = require("morgan");
const createHttpError = require("http-errors");
const xssClean = require("xss-clean");
const bodyParser = require("body-parser");
require("express-async-errors");

const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use("/public/avatars", express.static(path.join(cwd, "public", "avatars")));

app.use(cors("*"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use((_req, _res, next) => next(createHttpError(404, "Request not found!")));

app.use((err, _req, res, _next) =>
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  })
);

const server = http.createServer(app);

server.listen(port, () => {
  require("./config/db");
  consola.success(`Server up and running on ${port} 🚀`);
});
