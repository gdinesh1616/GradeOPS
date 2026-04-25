const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    rollNo: Number,
    answerScriptURL:String,
    marksByLLM:{
        type:Number,
        default:null,
    },
    marksByTA:{
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


})
const Student = mongoose.model("Student", studentSchema);

module.exports = Student
