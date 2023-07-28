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
    if (req.headers && req.headers.authorization) {
      const authArray = req.headers.authorization.split(" ");
      if (authArray && authArray.length > 0 && authArray[1]) {
        const token = authArray[1];

        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        const userObj = await User.findOne({
          _id: decodedToken._id,
          username: decodedToken.username,
          token: token,
          is_deleted: false,
        });

        if (userObj) {
          req.userId = userObj._id;
          req.userData = userObj;
          return next();
        }

        return res.status(AUTHORIZATION_ERROR).json({
          status: ERROR,
          message: "You are unauthorized user",
          data: {},
        });
      }

      return res.status(AUTHORIZATION_ERROR).json({
        status: ERROR,
        message: "Authentication Error",
        data: {},
      });
    }

    return res.status(AUTHORIZATION_ERROR).json({
      status: ERROR,
      message: "Token required",
      data: {},
    });
  } catch (error) {
    console.log("USER TOKEN ERROR --->", error);

    if (error.name === "TokenExpiredError") {
      // Handle token expiration
      return res.status(401).json({
        status: ERROR,
        message: "Token has expired. please login again!",
        data: {},
      });
    }

    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports = { userAuth };
