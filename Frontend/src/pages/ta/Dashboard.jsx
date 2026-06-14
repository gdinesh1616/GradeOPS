import api from "../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar'
import Examcard from '../../components/Examcard'
import '../../css/App.css'

export default function DashboardTA(){

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const elements = [];

    useEffect(() => {
      api.get("/api/exam/data")
      .then(res => setCourses(res.data))
      .catch((err) => {toast.error(err.message)});
    }, []);


    for (let i = 0; i < courses.length; i++) {
    elements.push(<Examcard person="TA" details={courses[i]} ></Examcard>);
    }


    return(
        <>
            <Navbar></Navbar>
            <div className='welcomebox page'>
                <h2>Welcome Back,</h2>
                <p>Current Exams</p>
            </div>
      <div>
        {elements.length === 0?<div className="no-exams-card">
          <div className="no-exams-icon">📚</div>
          <h2>No Current Exams</h2>
          <p>
            There are currently no active exams available.
            You can view once the Instructor has added them
          </p>
        </div>:elements}
        
            </div>
            <p>GRADEOPS</p>
        </>

    )
}