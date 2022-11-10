const User = require("../models/User")

exports.signupService = async(user)=>{
    const newUser = await User.create(user);
    return newUser;
}