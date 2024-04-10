const {
  signupService,
  loginService,
  getMeService,
  updateUser,
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
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.user?.id;
    const data = req.body;

    console.log(id, data);
    const user = await updateUser(id, data);

    user.password = undefined;
    res.status(200).json({
      status: "Successfully Updated User.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Failed to update user.",
      error: error.message,
    });
  }
};
exports.getMe = async (req, res) => {
  try {
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
