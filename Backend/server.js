const express = require("express");
const cors = require("cors");
const Course = require("./schema/examSchema")
const Student = require("./schema/studentShema")
const upload = require("./middleware.js");
const cloudinary = require("./config.js");
const axios = require("axios");
const AppError = require("./utils/AppError.js");
const errorHandler = require("./middleware/errorMiddleware.js")
const mongoose = require('mongoose');
require('dotenv').config();



main()
.then(()=>{console.log("Connected to db")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res,next)=>{
  next( new AppError("student not found",404));
})


app.post("/api/exam/submit",async (req,res,next)=>{
  const formdata = new Course(req.body);
  try{
    const response = await formdata.save();
    res.status(201).json(response);
  }catch(e){
    next(e);
  }
  

})

app.get("/api/exam/data",async(req,res,next)=>{
  try{
    const data = await Course.find({});
    res.status(200).send(data);
  }catch(e){
    next(e);
  }
})


app.get("/api/exam/:examId",async(req,res,next)=>{
  console.log("route hit");
  try{
    const id = req.params.examId;
    const data = await Course.findById(id);
    if(!data){
      return next(new AppError("Exam not Found",404));
    }
    res.send(data);
  }catch(e){
    next(e);
  }
})


app.post("/api/exam/:examId/student", upload.single("file"), async (req, res, next ) => {
try {
    const file = req.file;
    const rollNo = req.body.rollNo;
    const {examId} = req.params;

    const existingStudent = await Student.findOne({
      examId: examId,
      rollNo: rollNo,
    });

    if (existingStudent) {
      return next(
        new AppError(
          "This roll number has already submitted for this exam",
          409
        )
      );
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      type: "upload"
    });

    const student = new Student({
      rollNo,
      answerScriptURL: result.secure_url,
      examId:req.body.examId
    });

    const response = await student.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/api/:examId/postRubrics",async(req,res,next)=>{
  try{
    const {questions } = req.body;
    const {examId} = req.params;
    const result = await Course.findByIdAndUpdate(examId,{questions});
    if(!result){
      return next(new AppError("Exam Not Found",404));
    }
    res.send(result);

  }catch(e){
    next(e);
  }

})

app.post("/:examId/:studentId/evaluate",async(req,res,next)=>{
  try{
    const {examId,studentId} = req.params;
    const url = req.body.scriptURL;
    if(!url){
      return next(new AppError("Script URL is required",400));
    }
    const result = await Course.findById(examId);
    if(!result){
      return next(new AppError("Exam not found",404));
    }
    const questions = result.questions;
    const formattedQuestions = {};

    questions.forEach((q, index) => {
      formattedQuestions[`Q${index + 1}`] = {
        questionText: q.questionText,
        maxMarks: q.maxMarks,
        rubrics: q.rubrics
      };
    });
    const response = await axios.post( `${process.env.AI_SERVICE_URL}/evaluate`,{ pdf_url: url,rubric: formattedQuestions });
    if (!response.data) {
    return next(
      new AppError("Evaluation service failed", 500)
    );
    } 
    const saveText = await Student.findByIdAndUpdate(studentId,{answerText:response.data.answer_text,results:response.data.results,remarks:response.data.remarks,totalMarksByLLM:response.data.total_marks,status:"Evaluated By LLM"});
    res.status(200).send(saveText);
  }catch(e){
    next(e);
  }
  
})

app.get("/:examId/scripts",async (req, res, next)=>{
  try{
    const {examId} = req.params;
    let scripts = await Student.find({status:"Not Evaluated",examId:examId})
    res.send(scripts);
  }catch(e){
    next(e);
  }
})


app.get("/api/:examId/studentdata",async(req,res,next)=>{
  try{
    const examId = req.params.examId;
    const result = await Student.find({examId:examId})
    res.send(result);
  }catch(e){
    next(e);
  }
})


// app.post("/api/exam/:examId/qpUpload",upload.single("qp"),async(req,res,next)=>{
//   const examId = req.params.examId;

//  try {
//     const qp = req.file;
//     const result = await cloudinary.uploader.upload(qp.path, {
//       resource_type: "raw",
//       type: "upload"
//     });
//     console.log(result);
//    await Course.findByIdAndUpdate(examId,{qpURL:result.secure_url})

//   } catch (err) {
//     console.log(err);
//     next(e);
//   } 

// })

function generateNGrams(text, n = 8) {

    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    const ngrams = [];

    for(let i = 0; i <= words.length - n; i++) {

        ngrams.push(
            words.slice(i, i + n).join(" ")
        );
    }

    return ngrams;
}

function findCommonPhrases(text1, text2) {

    const set1 = new Set(
        generateNGrams(text1, 8)
    );

    const set2 = new Set(
        generateNGrams(text2, 8)
    );

    return [...set1].filter(
        phrase => set2.has(phrase)
    );
}

app.get("/api/exam/:examId/cheatingStatus",async(req,res,next)=>{
  console.log("hi");
  const examId = req.params.examId;
  const students = await Student.find({examId: examId});

  const suspiciousPairs = [];

for(let i = 0; i < students.length; i++) {
    for(let j = i + 1; j < students.length; j++) {
        const commonPhrases =
            findCommonPhrases(
                students[i].answerText,
                students[j].answerText
            );
        if(commonPhrases.length >= 2) {
          students[i].suspiciousMatches.push({
              rollNo: students[j].rollNo,
              matchedPhrases: commonPhrases,
          });
          students[j].suspiciousMatches.push({
              rollNo: students[i].rollNo,
              matchedPhrases: commonPhrases
          });
          students[i].possibleCheating = true;
          students[j].possibleCheating = true;

          await students[i].save();
          await students[j].save();
        }
    }
}
})

app.get("/api/:examId/getQuestions",async(req,res,next)=>{
  try{
  const examId = req.params.examId;
  const response = await Course.findById(examId);
  res.send(response);
  }catch(e){
    next(e);
  }
})

app.get("/api/:examId/student/:studentId/getDetails",async(req,res,next)=>{
  try{
    const studentId = req.params.studentId;
    const result = await Student.findById(studentId);
    res.send(result);
  }catch(e){
    next(e);
  }

})
app.get("/api/:examId/qp",async(req,re,next)=>{
  try{
    const examId = req.params.examId;
    const response = await Course.findById(examId);
    res.send(response.qpURL);   
  }catch(e){
    next(e);
  }
  
})

app.put("/api/:examId/student/:studentId/updateResults",async(req,res,next)=>{
  try{
    const studentId = req.params.studentId;
    const results = req.body;
    const totalMarksByTA = Object.values(results).reduce(
        (sum,q)=>sum + Number(q.marks),
        0
    );
    const updatedStudent =
      await Student.findByIdAndUpdate(studentId,{results: results,totalMarksByTA: totalMarksByTA,status:"Approved by TA"},{new:true});
      res.json(updatedStudent);
  }catch(e){
    next(e);
  }
})

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log("Server running on port"));