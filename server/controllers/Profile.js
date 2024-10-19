const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
exports.updateProfile = async (req, res) => {
    // get data
    // verify
    // find profile 
    // update profile
    // return response

    try{
        const {dateOfBirth='', about='', contactNumber, gender} = req.body;
     const id = req.user.id;
     if(!contactNumber || !gender || !id){
        return res.status(400).json({
            success: false,
            message: 'Please fill all fields'
        });
     }

     const userDetail = await User.findById(id);
     if(!userDetail){
        return res.status(400).json({
            success: false,
            message: "Couldn't find your profile!"
        })
     }

     const profileId = userDetail.additionalDetails;
     const profile = await Profile.findById(profileId);

     profile.dateOfBirth = dateOfBirth;
     profile.about = about;
     profile.gender = gender;
     profile.contactNumber = contactNumber;

     await profile.save();

     return re.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
     })
    } catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


exports.deleteAccount = async (req, res) => {
    try{
        // get data
        // verify
        // delete account
        // return response

        const {userId} = req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Couldn't find user!"
            })
        }

        const profileId = await User.additionalDetails;
        const coursesEnrolled = await User.courses;
        // unenroll user for all enrolled courses
        if (coursesEnrolled && coursesEnrolled.length > 0) {
            await Promise.all(
              coursesEnrolled.map(async (courseId) => {
                await Course.findByIdAndDelete({ _id: courseId });
              })
            );
        }
        await Profile.findByIdAndDelete({_id: profileId});
        await User.findByIdAndDelete({_id: userId});

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        })
    } catch(err){
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getAllUser = async (req, res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User Data fetched Successsfully!"
        })
    } catch(err){
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
