const jwt = require("jsonwebtoken");
const User = require("../schemas/users.schema");

const {
  ERROR,
  AUTHORIZATION_ERROR,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../constants/global.constants");

/** Authorization middleware to check */
const userAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(AUTHORIZATION_ERROR).json({
        status: ERROR,
        message: "Token required",
      });
    }

    const [, token] = authorizationHeader.split(" ");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const findUser = await User.findOne({
      _id: decodedToken._id,
      username: decodedToken.username,
      token,
      is_deleted: false,
    });

    if (!findUser) {
      return res.status(AUTHORIZATION_ERROR).json({
        status: ERROR,
        message: "You are an unauthorized user",
      });
    }

    req.userId = findUser._id;
    req.userData = findUser;
    return next();
  } catch (error) {
    console.error("Error in userAuth middleware:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: ERROR,
        message: "Token has expired. Please sign in again!",
      });
    }

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

module.exports = { userAuth };
