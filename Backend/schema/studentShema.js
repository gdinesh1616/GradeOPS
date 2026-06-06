const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  marks: Number,
  reason: String
}, { _id: false });

const studentSchema = new mongoose.Schema({
    rollNo: Number,
    answerScriptURL:String,
    marksByLLM:{
        type:Number,
        default:null,
    },
    totalMarksByTA:{
        type:Number,
        default:null,
    },
    status:{
        type:String,
        default:'Not Evaluated',
    },
    answerText:{
        type:String,
        dafault:null
    },
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        refer:'Course',
    },
    results: {
        type: Map,
        of: resultSchema
    },
    totalMarksByLLM:Number,
    totalMarksByTA:Number,
    remarks:String,
})
const Student = mongoose.model("Student", studentSchema);

module.exports = Student
