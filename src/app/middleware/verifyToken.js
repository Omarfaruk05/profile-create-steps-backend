const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        error: "Your are not login.",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const user = await User.findOne({ email: decoded.email });

    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      message: "Invalid token",
      error: error.message,
    });
  }
};
