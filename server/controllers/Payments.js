const User = require("../models/User");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course")
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");



// capture payment and initiate the razorpay

exports.capturePayment = async (req, res) => {
    try{
        // get course and user id
        // va;idation
        // has user already paid?
        // create order
        // return response

        const {course_id} = req.body;
        const userId = req.user.id;

        if(!course_id){
            return res.status(400).json({
                success: false,
                message: "Please provide valid course ID"
            })
        }
        // check for valid course details
        let course;
        
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success: false,
                message: "Course not found"
            })
        }
        const uid = new mongoose.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.json({
                success: false,
                message: "You have already enrolled in this course"
            })
        }

        const amount = course.price;
        const currency = "INR";
        const options = {
            amount : amount * 100,
            currency,
            receipt: `receipt_${new Date().getTime()}`,
            notes:{
                courseId: course_id,
                userId
            }
        }

        try{
            const paymentResponse = await instance.orders.create(options);
        } catch(err){
            console.log(err);
            return res.json({
                success: false,
                message: "Failed to create order"
            })
        }

        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            order: paymentResponse.id,
            currency: paymentResponse.amount,
            amount: paymentResponse.amount/100,
            message: "Order created successfully",
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.verifySignature = async (req, res) => {
        const webhookSecret = '12345';
        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret)
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("Payment is authorized!");

            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try{
                // fulfil the action
                // find the couse and enroll the student in it

                const enrolledCourse = await Course.findOneAndUpdate({_id: courseId}, {$push: {studentsEnrolled: userId}}, {new: true});

                if(!enrolledCourse){
                    return res.status(404).json({
                        success: false,
                        message: "Course not found"
                    })
                }

                console.log(enrolledCourse);

                // find the student and add them to course list

                const enrolledStudent = await User.findByIdAndUpdate(
                    {_id: userId}, 
                    {$push: {courses: courseId}}, 
                    {new: true})
                console.log(enrolledStudent);

                // send mail

                const emailResponse  = await mailSender(enrolledStudent.email, 
                    "Congratulations! You have been sucessfully added to the course", courseEnrollmentEmail
                )

                return res.status(200).json({
                    success: true,
                    message: "Course enrolled successfully",
                })
            } catch(err){
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                })
            }
        } else{
            return res.status(500).json({
                success: false,
                message: "Payment failed"
            })
        }
} 