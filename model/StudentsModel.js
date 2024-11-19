var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
  id: { type: Number },
  f_name: { type: String },
  l_name: { type: String },
  semester: { type: String },
});
module.exports = mongoose.model("Student", StudentSchema);
