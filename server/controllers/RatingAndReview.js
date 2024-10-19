const RatingAndReviews = require("../models/RatingAndReview")
const Course = require('../models/Course');
const { default: mongoose } = require("mongoose");

exports.getAverageRating = async (req, res) => {
    try{
        // get courseid
        // calculate avg rating
        // return rating

        const courseId = req.body.courseId;
        if(!courseId){
            return res.status(400).json({
                message: "Course ID is required"
            })
        }
        const result = await RatingAndReviews.aggregate({
            $match: {
                course: new mongoose.Types.ObjectId(courseId)
            },
            $group: {
                _id: null,
                averageRating: {$avg: '$rating'},
            }
        })

        if(result.length > 0){
            return res.status(200).json({
                message: "Average Rating",
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            message: "Average Rating is 0, no ratings available",
            success: true,
            averageRating: 0,
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}


exports.createRating = async (req, res) => {
    try{
        // get userif
        // fetch data from req body
        // check if user is engrolled or not
        // if enrolled then fetch data from RatingAndReview model (user has already reated)
        // create rating
        // save data in RatingAndReview model
        // update course with this
        // return response

        const userId = req.user.id;
        const {rating, review, courseId} = req.body;
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}
        });

        if(!courseDetails){
            return res.status(404).json({
                status: false,
                message: "Student not found"
            })
        }

        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            course: courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({
                status: false,
                message: "You have already reviewed this course"
            })
        }


        const ratingReview = await RatingAndReviews.create({
            user: userId,
            rating, review,
            course: courseId
        })

        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
            {$push: {ratingAndReviews: ratingReview._id}},
            {new: true}
        );
         
        console.log(updatedCourseDetails)
        return res.status(200).json({
            success: true,
            message: "Rating and review added successfully",
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

exports.getAllRating = async (req, res) => {
    try{
        const ratingsReviews = await RatingAndReviews.find().sort({rating: "desc"})
        .populate({
            path: 'user',
            select: "firstName lastName image email"
        })
        .populate({
            path: 'course',
            select: "couseName"
        }).exec();
        return res.status(200).json({
            success: true,
            message: "All ratings and reviews fetched successfully",
            data: ratingsReviews
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}


// courseId
// get all ratings and review for that course
// return res