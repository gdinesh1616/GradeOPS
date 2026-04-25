import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StudentdetailtableI from "../components/StudentdetailtableI";
import '../css/ViewstudentI.css'



export default function ViewstudentI(){
const navigate = useNavigate();
const { examId } = useParams();
const [coursename, setCoursename] = useState("hi");
useEffect(()=>{
     axios.get(`http://localhost:5000/api/exam/${examId}`)
      .then(res => setCoursename(res.data[0].courseName))
      .catch(err => console.error(err));
},[])
    
const openFormForStudent = ()=>{
  
  navigate(`/Instructor/${examId}/addStudentForm`);
}
const openformforqp = ()=>{
  navigate(`/Instructor/${examId}/Uploadqp`)
}

const evaluateScripts = async ()=>{
      //to text
      const scripts = await axios.get(`http://localhost:5000/${examId}/scripts`);
      for(let i=0;i<scripts.data.length;i++){
        let scriptURL = scripts.data[i].answerScriptURL
        const response = await axios.post(`http://localhost:5000/${examId}/${scripts.data[i]._id}/toText`,{scriptURL})
      }

      //evaluation code


      //status change
      

      
      
}

return(
    <>
    <Navbar></Navbar>
    <div className='viewStudentheader'>
        <h2>{coursename}</h2>
            <Button
              type="button"
              variant="outlined"
              onClick={openFormForStudent}
            >
              Upload Student Scripts
            </Button>
        <Button className="uploadqpbtn" variant="contained" onClick={openformforqp}>Upload Question Paper and rubrics</Button>
        <Button className="evaluatebtn" variant="contained" onClick={evaluateScripts}>Evaluate</Button>
    </div>
    <div className="viewStudent">
        <StudentdetailtableI examId={examId}></StudentdetailtableI>
    </div>
    
    
    </>
)

}