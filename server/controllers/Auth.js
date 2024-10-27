const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const {passwordUpdated}  = require("../mail/templates/passwordUpdate")
require("dotenv").config();
// sendOTP
exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // check unique otp or not
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};
        // create an entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return res
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


exports.signUp = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email, 
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        if(! firstName ||
            !lastName ||
            !email || 
            !password ||
            !confirmPassword ||
            !contactNumber ||
            !otp){
                return res.status(403).json({
                    success: false,
                    message: "All fields are required"
                })
            }

            if(password != confirmPassword){
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match"
                })
            }

            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);

            if(recentOtp.length == 0){
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP"
                })
            }

            if(otp != recentOtp){
                return res.status(400).json({
                    success: false,
                    message: "Invalif OTP"
                });
            }

            const hashedPassword = await bcrypt.hash(password);

            const profileDetails = await Profile.create({
                gender: null,
                dateOfBirth: null,
                about: null,
                contactNumber
            })
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                contactNumber,
                accountType,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/9.x/<styleName>/svg?seed=${firstName} ${lastName}`
            })

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                user,
            })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "Please enter both email and password"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            })
        } else{
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }  

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error, Couldn't login!",
        })
    }
}

exports.changePassword = async(req, res) => {
    // get data from req body
    // get oldPassword, newPass confirmPass
    // validation

    // update pwd in db

    // send mail - Password updated
    // res response

    try{
        const {email, password, newPassword, confirmPassword} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect current password"
            });
        }
        
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: hashedPassword },
			{ new: true }
		);

        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        return res.json({
            success: true,
            message: "Password updated successfully"
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error, Couldn't Change password!",
        })
    }
}