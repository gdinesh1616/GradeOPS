import '../css/Studentdetailtable.css'
import { useEffect, useState,useParams } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";


export default function StudentdetailtableTA(prop){
 const[data,setData] = useState([]);
 const navigate = useNavigate();


  useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/${prop.examId}/studentdata`);
    setData(result.data);
  };

  fetchData();
  
}, []);


    return(
<div class="table-container">
  <h2 class="table-title">📊 Student Evaluation Details</h2>

  <table class="styled-table">
    <thead>
      <tr>
        <th>Roll No</th>
        <th>LLM Marks</th>
        <th>TA Marks</th>
        <th>Status</th>
        <th>Remarks</th>
        <th>View</th>
      </tr>
    </thead>

      <tbody>
        {data.filter(student => student.status !== "Not Evaluated").map((student, index) => (
          <tr key={index}>
            <td>{student.rollNo}</td>
            <td>{student.totalMarksByLLM}</td>
            <td>{student.totalMarksByTA}</td>
            <td>{student.status}</td>
            <td>{student.remarks}</td>
            <td><Button variant="contained" onClick={ ()=>{
      navigate(`/TA/${prop.examId}/student/${student._id}/approve`)
}} studentId={student._id}>{student.status === "Approved by TA"? "Approved" : "Approve/Edit"}</Button></td>
          </tr>
        ))}
      </tbody>
  </table>
</div>
    )
}