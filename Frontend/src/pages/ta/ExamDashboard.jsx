import axios from "axios"
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import Button from '@mui/material/Button';
import StudentdetailtableTA from "../../components/StudentDetailsTableTA";
import '../../css/ViewstudentTA.css'


export default function ViewstudentTA () {

    const { examId } = useParams();
    const navigate = useNavigate();
    const [coursename, setCoursename] = useState("XX0000");


    useEffect(()=>{
     axios.get(`http://localhost:5000/api/exam/${examId}`)
      .then((res) => {setCoursename(res.data.courseName)})
      .catch((err) => {toast.error(err.message)});
    },[])

    const handleClick = async ()=>{
        navigate(`/TA/${examId}/viewRubrics`);
    }

    return(
        <>
            <Navbar></Navbar>
            <div className="examContent page">
                <p>{coursename}</p>
                <div className='detailBtns'>
                    <Button className="viewRubrics" variant="contained" onClick={handleClick}>View Rubrics</Button>
                </div>
            </div>
            <StudentdetailtableTA examId={examId}></StudentdetailtableTA>
        </>
    )
}