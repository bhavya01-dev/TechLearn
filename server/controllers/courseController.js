import Course from "../models/Course.js";
import { Types } from "mongoose";

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
export async function getCourses(req, res) {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(400).json({ success: false });
  }
}

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
export async function getCourse(req, res) {
  try {
    let course;

    // Check if ID is a valid MongoDB ObjectId
    if (Types.ObjectId.isValid(req.params.id)) {
      course = await Course.findById(req.params.id);
    } else {
      // If not a valid ObjectId, try to find by title (case-insensitive) or slug
      const titleSearch = req.params.id.split("-").join(" ");
      course = await Course.findOne({
        $or: [
          { title: new RegExp(`^${titleSearch}$`, "i") },
          { title: new RegExp(`^${req.params.id}$`, "i") }
        ]
      });
    }

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private/Admin
export async function createCourse(req, res) {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
