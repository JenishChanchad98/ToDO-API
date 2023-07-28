const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// Token Generation
const generateToken = (data) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY || "Change_YOUR_SECRET";

  return jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
};

const generateTokenForgotPassword = (data) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY || "Change_YOUR_SECRET";

  return jwt.sign(data, jwtSecretKey);
};

const authService = {
  generateToken,
  generateTokenForgotPassword,
};

module.exports = authService;
