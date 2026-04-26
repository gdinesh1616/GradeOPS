const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText:String,
  maxMarks:Number,
  rubrics:String,
})


const courseSchema = new mongoose.Schema({
  courseName: String,
  numStudents: Number,
  conductedOn: Date,
  numTAs: Number,
  qpURL:String,
  status:{
    type:String,
    default:"Not Evaluated"
  },
  questions:[questionSchema],
});
const Course = mongoose.model("Course", courseSchema);




module.exports = Course;