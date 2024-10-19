const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImage} = require('../utils/imageUploader');
require("dotenv").config();
exports.createCourse = async(req, res) => {
    // get data
    // file fetch
    // perform validation - tags, instructor, data
    // upload image to cloudinary
    // url
    // create course entry in db
    // add course entry in schema
    // add course entry in category
    // return course
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        const thumbnail = req.files.thumbnail;

        if(!thumbnail || !courseName || !courseDescription|| !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                message: "Please fill all the fields",
                status: false
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if(!instructorDetails){
            return res.status(400).json({
                message: "Instructor not found",
                status: false
            })
        }

        // check the given category
        const tagDetails = await Category.findById(category);
        if(!tagDetails){
            return res.status(400).json({
                message: "Category not found",
                status: false
            })
        }

        const thumbnailImg = await uploadImage(thumbnail, process.env.FOLDER_NAME);
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            category: tagDetails._id,
            price,
            whatYouWillLearn,
            thumbnail: thumbnailImg.secure_url,
        })

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {$push: {
                courses: newCourse._id,
            }},
            {new: true},
        );

        // update category schema
        await Category.findByIdAndUpdate(
            {_id: tagDetails._id},
            {$push: {
                courses: newCourse._id,
            }},
            {new: true},
        )

        return res.status(200).json({
            message: "Course created successfully",
            status: true,
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Failed to create Course",
            status: false,
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({}, {
            courseName: true,
            ratingAndReviews: true,
            instructor: true,
            studentsEnrolled: true,
            price: true, 
            thumbnail: true
        }).populate("instructor").exec();

        return res.status(200).json({
            message: "All Courses fetched successfully",
            status: true,
        })

    } catch(err){
        console.log(err);
        return res.status(200).json({
            message: "Failed to fetch Courses",
            status: false,
        })
    }
}


exports.getCourseDetails = async(req, res) => {
    try{
        // get id
        const courseId = req.body;
        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate:{
                path: "additionalDeatils"
            },
        
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        if(!courseDetails){
            return res.json({
                successs: false,
                message: "Course not found",
            })
        }

        return res.status(200).json({
            message: "Course details fetched successfully",
            success: true,
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Course details",
        })
    }
}