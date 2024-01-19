const User = require("../schemas/users.schema");

const {
  OK,
  ERROR,
  SUCCESS,
  DATA_CREATED,
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST,
} = require("../constants/global.constants");
const {
  passwordHash,
  comparePasswordHash,
} = require("../helpers/password.helper");
const authService = require("../helpers/token.helper");

exports.signUp = async (req, res) => {
  try {
    let body = req.body;
    body.username = body.username.toLowerCase();

    let existUser = await User.findOne({
      $or: [{ username: body.username }],
    });

    if (existUser) {
      return res.status(BAD_REQUEST).json({
        status: ERROR,
        message: "User name is exits",
      });
    }

    body.password = await passwordHash(body.password);
    const userData = await User.create(body);

    const tokenObj = {
      _id: userData._id,
      username: userData.username,
      name: userData.name,
    };

    const token = authService.generateToken(tokenObj);
    userData.token = token;

    await User.findOneAndUpdate(
      { _id: userData._id },
      { $set: { token: token } }
    );

    if (userData) {
      return res.status(DATA_CREATED).json({
        status: SUCCESS,
        message: "User signUp",
        data: userData,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "User not signUp",
    });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const body = req.body;

    var findUser = await User.findOne({
      username: body.username,
    });

    if (
      findUser &&
      (await comparePasswordHash(body.password, findUser.password))
    ) {
      findUser = findUser.toObject();
      delete findUser.password;
      delete findUser.token;

      const tokenObj = {
        _id: findUser._id,
        username: findUser.username,
        name: findUser.name,
      };

      const token = authService.generateToken(tokenObj);
      findUser.token = token;

      await User.findOneAndUpdate(
        { _id: findUser._id },
        { $set: { token: token } }
      );

      return res.status(OK).json({
        status: SUCCESS,
        message: "signIn successful",
        data: findUser,
      });
    }

    return res.status(OK).json({
      status: ERROR,
      message: "Invalid credentials",
    });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      status: ERROR,
      message: "Internal server error",
    });
  }
};
