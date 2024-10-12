const jwt =require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/User");

// auth

exports.auth = async(req, res, next) => {
    try{
        // extract token
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                error: "Access denied. No token provided.",
                success: false,
            })
        }

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;

        } catch (er){
            return res.status(401).json({
                success: false,
                message: "Token Invalid"
            })
        }   

        next();
    } catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


// isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "You are not a student"
            })
        }
        next();
    } catch(err){
        return res.status(500).json({
            message: "Something went wrong, User role can't be verified",
            success: false
        })
    }
}

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "You are not a Instructor"
            })
        }
        next();
    } catch(err){
        return res.status(500).json({
            message: "Something went wrong, User role can't be verified",
            success: false
        })
    }
}

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "You are not a Admin"
            })
        }
        next();
    } catch(err){
        return res.status(500).json({
            message: "Something went wrong, User role can't be verified",
            success: false
        })
    }
}

