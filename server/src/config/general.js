require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  rounds: +process.env.ROUNDS || 10,
  founderMail: process.env.FOUNDER_MAIL || "MKK@GMAIL.COM",
  jwtRefreshAlgo: process.env.REFRESH_ALGO || "HS256",
  jwtSignInAlgo: process.env.SIGN_IN_ALGO || "HS256",
};
