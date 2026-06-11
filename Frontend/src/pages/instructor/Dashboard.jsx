import axios from "axios";
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
      axios.get("http://localhost:5000/api/exam/data")
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
      
      <div>{elements}</div>
      <p>GRADEOPS</p>
    </>
    
    )
}
export default Instructorexam;