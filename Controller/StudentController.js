var mongoose = require("mongoose");
const StudentModel = require("../model/StudentsModel");
module.exports = {
  getallStudents: async function (req, res) {
    console.log("we are inside the all func body");
    const result = await StudentModel.find();
    res.render("Student.ejs", { alltheStudent: result });
  },
  addStudents: async function (req, res) {
    const { id, f_name, l_name, semester } = req.body;
    const newStudent = new StudentModel({
      id,
      f_name,
      l_name,
      semester,
    });
    await newStudent.save();
    console.log("Student added successfully!");
  },

  updateStudents: async function (req, res) {
    try {
      const { id, f_name, l_name, semester, courses } = req.body;

      // Ensure that `courses` is always an array, even if not provided
      const updatedCourses = courses ? courses.split(",") : [];

      // Update the student details based on the provided ID
      const result = await StudentModel.findOneAndUpdate(
        { id }, // Search criteria
        { f_name, l_name, semester, courses: updatedCourses }, // Updated fields
        { new: true } // Return the updated document
      );

      if (result) {
        console.log("Student updated successfully!", result);
        res.redirect("/"); // Redirect to the homepage
      } else {
        console.error("Student not found with the provided ID");
        res.status(404).send("Student not found");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteStudents: async function (req, res) {
    console.log("we are inside the all func body");
    const result = await StudentModel.deleteOne();
    res.render("Student.ejs", { alltheStudent: result });
  },
};
