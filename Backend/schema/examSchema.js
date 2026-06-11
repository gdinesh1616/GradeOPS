const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText:String,
  maxMarks:Number,
  rubrics:String,
})


const courseSchema = new mongoose.Schema({
  courseName: {
    type:String,
    required:[true,"courseName is required"],
  },
  numStudents: {
    type:Number,
    required:[true,"number of students is required"],
  },
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