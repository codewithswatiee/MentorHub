const SubSection = require("../models/SubSection");
const Section = require("../models/Section")
const {uploadImage} = require("../utils/imageUploader");
require("dotenv").config()
exports.createSubSection = async (req, res) => {
    try{
        // get data
        // extract file/video
        // perform validation
        // upload video to cloudinary
        // save data to database ie create a subsection
        // insert subsection id in section
        // return response


        const {title, description, timeDuration, sectionId} = req.body;
        const video = req.files.videoFile;

        if(!title || !description || !timeDuration || !video || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }

        const uploadDetails = await uploadImage(video, process.env.FOLDER_NAME)
        const SubSectionDetails = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl: uploadDetails.secure_url,
        })

        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
            {$push: {subSection: SubSectionDetails._id}},
            {new: true}
        ).populate("subSection").exec();

        res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }    
}


exports.updateSubsection = async (req, res) => {
    try {
        // Extracting data from the request body
        const { title, description, timeDuration, subSectionId } = req.body;
        const video = req.files ? req.files.videoFile : null; // Safeguard for the case where files are missing

        // Validating required fields
        if (!title || !description || !timeDuration || !video || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields",
            });
        }

        // Upload the video file to the desired location (assuming uploadImage is a function that returns a promise)
        const videoDetails = await uploadImage(video, process.env.FOLDER_NAME);

        if (!videoDetails || !videoDetails.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Video upload failed",
            });
        }

        // Update the subsection in the database
        const updatedSubsection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                description,
                timeDuration,
                videoUrl: videoDetails.secure_url, // Assuming secure_url contains the uploaded video URL
            },
            { new: true }
        );

        if (!updatedSubsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        // Send a success response
        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            data: updatedSubsection,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};


exports.deleteSubsection = async (req, res) => {
    try{
        const subSectionId = req.params;

        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            });
        }

        const subsection = await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            message: "Subsection Deleted Sucessfully"
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}