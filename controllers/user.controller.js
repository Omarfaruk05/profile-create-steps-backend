const { signupService } = require("../services/user.service");

exports.singup = async(req, res)=> {
    try {
        const user = await signupService(req.body);
        
        user.password= undefined;

        res.status(200).json({
            status:'Success',
            message: "Signup is Successfull.",
            data:user,
        });
    } catch (error) {
        res.status(400).json({
            status:'Fail',
            message: "Signup is not Successfull.",
            error: error.message,
        });
    }
};