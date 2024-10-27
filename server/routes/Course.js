const express = require("express");
const { createCourse, getAllCourses, getCourseDetails } = require("../controllers/Course");
const { showAllCategory, createCategory, categoryPageDetails } = require("../controllers/Category");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubsection, deleteSubsection } = require("../controllers/Subsection");
const { createRating, getAllRating, getAverageRating } = require("../controllers/RatingAndReview");
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth");


const router = express.Router();


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


// Instructor protected paths

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.put("/updateSubSection", auth, isInstructor, updateSubsection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// For all
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetails)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************


router.post("/createCategory", auth, isAdmin, createCategory) //category can only be created by admin!
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


module.exports = router;


