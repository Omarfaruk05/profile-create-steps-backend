const {
  signupService,
  loginService,
  getMeService,
} = require("../services/user.service");
const bcrypt = require("bcrypt");

exports.singup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    user.password = undefined;

    res.status(200).json({
      status: true,
      message: "Signup is Successfull.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Signup is not Successfull.",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      status: "Success",
      message: "login successfull.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "logn is not successfull.",
      error: error.message,
    });
  }
};
exports.getMe = async (req, res) => {
  try {
    console.log(req.headers);
    const user = await getMeService(req.user?.id);

    user.password = undefined;
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "logn is not successfull.",
      error: error.message,
    });
  }
};
