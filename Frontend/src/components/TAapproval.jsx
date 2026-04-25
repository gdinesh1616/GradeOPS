import '../css/TAapproval.css'
import Button from '@mui/material/Button';
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TAapproval(){
    const {examId,studentId} = useParams();
    const[data,setData] = useState({});
    const [marks,setMarks] = useState(data.marksByLLM);
    const [isEditing,setIsEditing] = useState(true);
    useEffect(()=>{
        const fetchdata = async()=>{
        const results = await axios.get(`http://localhost:5000/api/${examId}/student/${studentId}/getDetails`)
        setData(results.data)

    }
    fetchdata();

    },[])

    const handleEditClick = ()=>{
        setIsEditing(!isEditing);
    }
    const handleApproveClick = ()=>{
        
    }

    return(
        <>
           <div className="taApproval">
            <h3>Student Evaluation Details</h3>
            <p>Roll number of the student :  {data.rollNo}</p>
            <p>Marks : {data.marksByLLM}</p>
            <hr></hr>
            <p>Question:{1}</p>
            <p>Marks:<input className="editMarks" disabled={isEditing} value={marks} onChange={(e)=>setMarks(e.target.value)}></input>/{5}</p>
            <h4>Reason:</h4>
            
            <Button variant="contained" onClick={handleEditClick}>Edit</Button>
            <Button variant="contained" onClick={handleApproveClick}>Approve</Button>
           </div>
        </>

    )
}