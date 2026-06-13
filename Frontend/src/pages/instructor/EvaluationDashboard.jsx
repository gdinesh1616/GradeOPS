import api from "../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar"
import Button from '@mui/material/Button';
import StudentdetailtableI from "../../components/StudentDetailsTableInstructor";
import '../../css/ViewstudentI.css'


export default function ViewstudentI(){
    const navigate = useNavigate();
    const { examId } = useParams();
    const [loading,SetLoading] = useState(false);
    const [coursename, setCoursename] = useState("XXXXX");


    useEffect(()=>{
        api.get(`/api/exam/${examId}`)
          .then((res) => {setCoursename(res.data.courseName)})
          .catch((err) => {toast.error(err.message)});
    },[])
    
    const openFormForStudent = ()=>{
      navigate(`/Instructor/${examId}/addStudentForm`);
    }

    const openformforqp = ()=>{
      navigate(`/Instructor/${examId}/Uploadqp`)
    }

    const evaluateScripts = async ()=>{
      SetLoading(true);
      try{
          const scripts = await api.get(`/${examId}/scripts`);
          const rubrics = await api.get(`/api/${examId}/getQuestions`)
          if(scripts.data.length == 0){
            toast.error("Add students to evaluate");
            return;
          }if(rubrics.data.questions.length == 0){
           toast.error("Upload rubrics to evaluate");
           return;
          }
          for(let i=0;i<scripts.data.length;i++){
            let scriptURL = scripts.data[i].answerScriptURL
            const response1 = await api.post(`/${examId}/${scripts.data[i]._id}/evaluate`,{scriptURL});
            const response2 = await api.get(`/api/exam/${examId}/cheatingStatus`)
          }
        }catch(e){
          console.log(e);
          toast.error("Server error")
        }finally{
          SetLoading(false);
        }  
    }

return(
    <>
      <Navbar></Navbar>
      <div className='viewStudentheader page'>
        <h2>{coursename}</h2>
            <Button
              type="button"
              variant="outlined"
              onClick={openFormForStudent}
            >
              Upload Student Scripts
            </Button>
        <Button className="uploadqpbtn" variant="contained" onClick={openformforqp}>Upload Question Paper and rubrics</Button>
        <Button className="evaluatebtn" style={{backgroundColor : loading?"red":"green"}} variant="contained" onClick={evaluateScripts}>{loading?"Evaluating":"Evaluate"}{loading?<span className="spinner"></span>:""}</Button>
      </div>
      <div className="viewStudent">
          <StudentdetailtableI examId={examId}></StudentdetailtableI>
      </div>
    </>
)
}