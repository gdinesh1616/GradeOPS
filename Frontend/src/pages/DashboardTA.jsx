import Navbar from '../components/Navbar'
import Examcard from '../components/Examcard'
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardTA(){
const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/api/exam/data")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

    const elements = [];
for (let i = 0; i < courses.length; i++) {
  elements.push(<Examcard person="TA" details={courses[i]} ></Examcard>);
}


    return(
        <>
            <Navbar></Navbar>
            <div className="welcomebox">
                <h2>Welcome Back,</h2>
                <p>Current Exams</p>
            </div>
            <div>{elements}</div>
            <p>GRADEOPS</p>
        </>

    )
}