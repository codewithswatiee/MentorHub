const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
    try{
        // get email
        // check user for this email and validation
        // generate token
        // send email with token
        // update user by adding token and expiration time
        // create mail
        // return response

        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }


        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email: email}, {
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000,
        },
        {new: true}
    );
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Password reset Link: ${url}`);

        return res.json({
            success: true,
            message: "Password reset link sent to your email",
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

exports.resetPassword = async (req, res) => {
    try{
        const {token, newPassword, confirmPassword} = req.body

        if(!token || !newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                    success: false,
                    message: "Passwords donot match!"
            })
        }
        const userDetails = await User.findOne({token: token});
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token Expired!"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({token: token},         
                                    {password: hashedPassword},
                                    {new: true}, 
                                )
        
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}