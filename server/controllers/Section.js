const Course = require("../models/Course");
const Section = require("../models/Section");


exports.createSection = async (req, res) => {
    try{
        // get all data
        // perform validation
        // create the section
        // update course schema with objId
        // return response

        const {sectionName, courseID} = req.body;
        if(!sectionName || !courseID){
            return res.status(400).json({
                message: "Please provide all required fields",
                success: false
            })
        }

        const newSection =await Section.create({sectionName});
        const updatedCourse = await Course.findByIdAndUpdate({
            courseID,
            $push : {courseContent: newSection._id},
            new: true
        }).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).exec()

        return res.status(400).json({
            message: "Section created successfully",
            success: true,
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!",
            success: false,
        })
    }
}


exports.updateSection = async (req, res) => {
    try{
        // get data
        // perform validation
        // update data in section

        const {sectionName, sectionId} = req.body;
        if(!sectionId || !sectionName){
            return res.status(500).json({
                message: "All fields are required!",
                success: false,
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true})

        return res.status(400).json({
            message: "Section updated Successfully!",
            success: true,
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!",
            success: false,
        })
    }
}


exports.deleteSection = async (req, res) => {
    try{
        // get data -assuming that we are sending ID in params
        // use findbyid&delete

        const {sectionId} = req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(400).json({
            message: "Section deleted successfully",
            success: true,
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong!",
            success: false,
        })
    }
}