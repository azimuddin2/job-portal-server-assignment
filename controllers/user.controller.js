const { signupService, loginUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully sign up",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't the sign up",
            error: error.message
        })
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials"
            });
        };

        const user = await loginUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user fund. Please create an account"
            });
        };

        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                error: "Password is not correct"
            });
        };

        if (user.status != 'active') {
            return res.status(401).json({
                status: "fail",
                error: "Your account is not active yet."
            });
        };

        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: others,
                token
            }
        });


    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't the login ",
            error: error.message
        })
    }
};


exports.getMe = async(req, res) => {
    try {

        const user = await loginUserByEmail(req.user?.email);
        
        res.status(200).json({
            status: "success",
            message: "Successfully get the user information",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message
        })
    }
};