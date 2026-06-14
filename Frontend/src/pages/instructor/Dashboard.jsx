import api from "../../api";
import Navbar from '../../components/Navbar'
import Examcard from '../../components/Examcard'
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../css/App.css'


function Instructorexam () {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const elements = [];

    useEffect(() => {
      api.get("/api/exam/data")
      .then((res) => setCourses(res.data))
      .catch((err) => {toast.error(err.message)});
    }, []);

    for (let i = 0; i < courses.length; i++) {
      elements.push(<Examcard details={courses[i]} person={"Instructor"}></Examcard>);
    }
    const handleClick1 = async ()=>{
        navigate("/newexam");
    }
    
    return (
    <>
      <Navbar></Navbar>
      <div className="welcomebox page">
        <h2>Welcome Back,</h2>
        <Button variant="contained" onClick={handleClick1} className='addExambtn'>+ Add Exam</Button>
      </div>
      
      <div>
        {elements.length === 0?<div className="no-exams-card">
          <div className="no-exams-icon">📚</div>
          <h2>No Current Exams</h2>
          <p>
            There are currently no active exams available.
            Create an exam to evaluate.
          </p>
        </div>:elements}
        

        
      </div>
      <p>GRADEOPS</p>
    </>
    
    )
}
export default Instructorexam;