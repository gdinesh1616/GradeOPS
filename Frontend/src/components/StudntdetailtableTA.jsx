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

const handleClick = ()=>{
      navigate(`/TA/${prop.examId}/student/${data[0]._id}/approve`)
}
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
        {data.map((student, index) => (
          <tr key={index}>
            <td>{student.rollNo}</td>
            <td>{student.totalMarksByLLM}</td>
            <td>{student.marksByTA}</td>
            <td>{student.status}</td>
            <td>{student.remarks}</td>
            <td><Button variant="contained" onClick={handleClick} studentId={student._id}>Approve/Edit</Button></td>
          </tr>
        ))}
      </tbody>
  </table>
</div>
    )
}