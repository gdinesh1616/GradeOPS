import { useEffect, useState } from "react";
import api from "../api";
import {toast} from "react-toastify";
import '../css/Studentdetailtable.css'


export default function StudentdetailtableI(prop){

    const[data,setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try{
          const result = await api.get(`/api/${prop.examId}/studentdata`);
          setData(result.data);
        }catch(e){
          toast.error(e.message);
        }
        
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
              <th>Cheating Status</th>
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
                <td>

    {student.suspiciousMatches?.length > 0 ? (

        <div className="cheatingStatus">

            <button>Suspicious</button>

            <div className="hoverCard">

                <strong>Similar To</strong>

                {
    student.suspiciousMatches.map(match => (
        <div key={match.rollNo}>

            <p>
                Roll No:
                {match.rollNo}
            </p>

            <ul>
    {
        match.matchedPhrases
            .slice(0, 2)
            .map((phrase, index) => (
                <li key={index}>
                    {phrase}
                </li>
            ))
    }
</ul>

            <hr />

        </div>
    ))
}

            </div>

        </div>

    ) : (

        <span>✓ Clear</span>

    )}

</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );  
}