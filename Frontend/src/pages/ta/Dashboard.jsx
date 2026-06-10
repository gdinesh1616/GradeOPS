import axios from "axios";
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
      axios.get("http://localhost:5000/api/exam/data")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
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
            <div>{elements}</div>
            <p>GRADEOPS</p>
        </>

    )
}