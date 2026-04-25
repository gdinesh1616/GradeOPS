const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: String,
  numStudents: Number,
  conductedOn: Date,
  numTAs: Number,
  qpURL:String,
  status:{
    type:String,
    default:"Not Evaluated"
  }
});
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;