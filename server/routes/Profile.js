const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
  updateProfile,
  getAllUser,
  getEnrolledCourses,
  updateDisplayPicture,
  deleteAccount,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUser)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router