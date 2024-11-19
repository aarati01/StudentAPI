var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var app = express();

// Body parser middleware (using built-in express methods)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Mongoose Connection
mongoose.connect("mongodb://127.0.0.1:27017/Student", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("We are connected to MongoDB");
});
db.on("error", (err) => {
  console.error("Connection error:", err);
});

// Load Model
require("./model/StudentsModel");

// Import Controller
const StudentController = require("./Controller/StudentController");

//route for the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Routes
app.get("/student", StudentController.getallStudents);

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
