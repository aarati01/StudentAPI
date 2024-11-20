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
    const { id, f_name, l_name, semester, courses } = req.body;

    const result = await StudentModel.findOneAndUpdate(
      { id },
      { f_name, l_name, semester, courses: courses.split(",") },
      { new: true }
    );

    if (result) {
      console.log("Student updated successfully!", result);
      res.redirect("/");
    } else {
      res.status(404).send("Student not found");
    }
  },
};
