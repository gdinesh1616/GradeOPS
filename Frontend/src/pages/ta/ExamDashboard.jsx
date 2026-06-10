import axios from "axios"
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
    const [qpURL,setQpURL] = useState();

    useEffect( ()=>{
        axios.get(`http://localhost:5000/api/${examId}/qp`)
        .then(res => setQpURL(res.data))
        .catch(err => console.log(err));

    })

    useEffect(()=>{
     axios.get(`http://localhost:5000/api/exam/${examId}`)
      .then(res => setCoursename(res.data[0].courseName))
      .catch(err => console.error(err));
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