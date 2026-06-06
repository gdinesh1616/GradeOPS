import '../css/Studentdetailtable.css'
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentdetailtableI(prop){
 const[data,setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/api/${prop.examId}/studentdata`);
    console.log(result);
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
        <th>Answer Script</th>
        <th>LLM Marks</th>
        <th>TA Marks</th>
        <th>Status</th>
        <th>Remarks</th>
      </tr>
    </thead>

      <tbody>
        {data.map((student, index) => (
          <tr key={index}>
            <td>{student.rollNo}</td>
            <td><a href={student.answerScriptURL}>View PDF</a></td>
            <td>{student.totalMarksByLLM}</td>
            <td>{student.totalMarksByTA}</td>
            <td>{student.status}</td>
            <td>{student.remarks}</td>
          </tr>
        ))}
      </tbody>
  </table>
</div>
    )
}