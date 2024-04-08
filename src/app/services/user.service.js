const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genetateToken } = require("../../utils/token");

exports.signupService = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};
exports.loginService = async (email, password) => {
  if (!email || !password) {
    return res.status(401).json({
      status: "Fail",
      error: "Please provide your email and password.",
    });
  }

  const user = await User.findOne({ email });
  console.log(user);

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

exports.getMeService = async (id) => {
  const user = await User.findById(id);
  return user;
};
