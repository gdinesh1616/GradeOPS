import Navbar from '../components/Navbar'
import Examcard from '../components/Examcard'
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Instructorexam() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/api/exam/data")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

    const elements = [];

for (let i = 0; i < courses.length; i++) {
  elements.push(<Examcard details={courses[i]} person={"Instructor"}></Examcard>);
}


    const handleClick1 = async ()=>{
        navigate("/newexam");
    }
  return (<>
    <Navbar></Navbar>
    <div className="welcomebox">
      <h2>Welcome Back,</h2>
      <Button variant="contained" onClick={handleClick1} className='addExambtn'>+ Add Exam</Button>
    </div>
    
    <div>{elements}</div>
    <p>GRADEOPS</p>
  </>
    
  )
}
export default Instructorexam