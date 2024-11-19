var mongoose = require("mongoose");
const StudentModel = require("../model/StudentsModel");
module.exports = {
  getallStudents: async function (req, res) {
    console.log("we are inside the all func body");
    const result = await StudentModel.find();
    res.render("Student.ejs", { alltheStudent: result });
  },
};
