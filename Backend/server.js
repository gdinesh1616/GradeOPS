const express = require("express");
const cors = require("cors");
const Course = require("./schema/examSchema")
const Student = require("./schema/studentShema")
const upload = require("./middleware.js");
const cloudinary = require("./config.js");
const axios = require("axios");

const mongoose = require('mongoose');
main()
.then(()=>{console.log("Connected to db")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gradeOPS');
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/exam/submit",async (req,res)=>{
  console.log(req.body);
  const formdata = new Course(req.body);
  await formdata.save();

})

app.get("/api/exam/data",async(req,res)=>{
  const data = await Course.find({});
  res.send(data);
})
app.get("/api/exam/:examId",async(req,res)=>{
  const id = req.params.examId;
  const data = await Course.find({_id:id});
  res.send(data);
})
app.post("/api/exam/:examId/student", upload.single("file"), async (req, res) => {
try {
    const file = req.file;
    const rollNo = req.body.rollNo;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      type: "upload"
    });

    const student = new Student({
      rollNo,
      answerScriptURL: result.secure_url,
      examId:req.body.examId
    });

    await student.save();
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/api/:examId/postRubrics",async(req,res)=>{
  const {questions } = req.body;
  const {examId} = req.params;
  const result = await Course.findByIdAndUpdate(examId,{questions});
})

app.post("/:examId/:studentId/evaluate",async(req,res)=>{
  const{examId,studentId} = req.params;
  const url = req.body.scriptURL;
  const result = await Course.findById(examId);
  const questions = result.questions;
  console.log(url,questions);
  const formattedQuestions = {};

questions.forEach((q, index) => {
  formattedQuestions[`Q${index + 1}`] = {
    questionText: q.questionText,
    maxMarks: q.maxMarks,
    rubrics: q.rubrics
  };
});
console.log(formattedQuestions)
  const response = await axios.post( "http://127.0.0.1:8000/evaluate",{ pdf_url: url,rubric: formattedQuestions })
  console.log(response.data);
   const saveText = await Student.findByIdAndUpdate(studentId,{answerText:response.data.answer_text,results:response.data.results,remarks:response.data.remarks,totalMarksByLLM:response.data.total_marks,status:"Evaluated By LLM"});
  // res.send(saveText);
})

app.get("/:examId/scripts",async (req,res)=>{
  const {examId} = req.params;
  let scripts = await Student.find({status:"Not Evaluated",examId:examId})
  res.send(scripts);
})


app.get("/api/:examId/studentdata",async(req,res)=>{
  const examId = req.params.examId;
  const result = await Student.find({examId:examId})
  res.send(result);
})


app.post("/api/exam/:examId/qpUpload",upload.single("qp"),async(req,res)=>{
  const examId = req.params.examId;

 try {
    const qp = req.file;
    // const ap = req.ap;

    const result = await cloudinary.uploader.upload(qp.path, {
      resource_type: "raw",
      type: "upload"
    });
    console.log(result);
   await Course.findByIdAndUpdate(examId,{qpURL:result.secure_url})

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  } 

})
app.get("/api/:examId/student/:studentId/getDetails",async(req,res)=>{
    const studentId = req.params.studentId;
    const result = await Student.findById(studentId);
    res.send(result);
})
app.get("/api/:examId/qp",async(req,res)=>{
    const examId = req.params.examId;
    const response = await Course.findById(examId);
  res.send(response.qpURL);   
})

app.put("/api/:examId/student/:studentId/updateResults",async(req,res)=>{
  const studentId = req.params.studentId;
  const results = req.body;
   const totalMarksByTA = Object.values(results).reduce(
        (sum,q)=>sum + Number(q.marks),
        0
    );
  const updatedStudent =
      await Student.findByIdAndUpdate(studentId,{results: results,totalMarksByTA: totalMarksByTA,status:"Approved by TA"},{new:true});
      res.json(updatedStudent);
})

app.get("/api/user", (req, res) => {
  res.json({ name: "Dinesh", age: 20 });
});

app.listen(5000, () => console.log("Server running on port 5000"));