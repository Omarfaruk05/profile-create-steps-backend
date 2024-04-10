const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genetateToken } = require("../../utils/token");

exports.signupService = async (user) => {
  const newUser = await User.create(user);

  const loginInfo = await this.loginService(user.email, user.password);
  console.log(loginInfo);
  return loginInfo;
};
exports.loginService = async (email, password) => {
  if (!email || !password) {
    return res.status(401).json({
      status: "Fail",
      error: "Please provide your email and password.",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new error("User doesn't found!");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid);

  console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw new error("Password is not correct!");
  }

  const token = genetateToken(user);

  user.password = undefined;

  return {
    user,
    token,
  };
};

exports.updateUser = async (id, data) => {
  const user = await User.findOne({ id });

  if (!user) {
    throw new error("User doesn't found!");
  }

  const updatedUser = await User.findOneAndUpdate(id, data, { new: true });

  return updatedUser;
};

exports.getMeService = async (id) => {
  const user = await User.findById(id);
  return user;
};
