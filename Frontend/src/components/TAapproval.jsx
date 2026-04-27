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
    const [marks,setMarks] = useState(data.totalMarksByLLM);
    const [isEditing,setIsEditing] = useState(true);
    const [index,setIndex] = useState(0);
    const questions = Object.values(data?.results || {});
    const [editedResults,setEditedResults] = useState(Object.values(data?.results || {}))

    const handleMarksChange = (value)=>{
        const updated = {...editedResults};
        updated[index].marks = value;
        console.log(updated);
        setEditedResults(updated);
    }

    useEffect(()=>{
        const fetchdata = async()=>{
        const response = await axios.get(`http://localhost:5000/api/${examId}/student/${studentId}/getDetails`)
        console.log(response.data);
        setData(response.data)
        

    }
    fetchdata();

    },[])
    const handlePreviousClick = ()=>{}
    const handleNextClick = ()=>{}
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
            <p>Marks : {data.totalMarksByLLM}</p>

            <hr></hr>

            
                <p>Question:{index+1}</p>
                <p>Marks:<input className="editMarks" disabled={isEditing} value={editedResults[index]?.marks} onChange={handleMarksChange}></input>/{5}</p>
                <h4>Reason:{questions[index]?.reason}</h4>
            
            <Button variant="contained" onClick={handleEditClick}>Edit</Button>
            <Button variant="contained" onClick={handlePreviousClick}>Previous</Button>
            <Button variant="contained" onClick={handleNextClick}>Approve</Button>
            <Button variant="contained" onClick={handleApproveClick}>Next</Button>
           </div>
        </>

    )
}