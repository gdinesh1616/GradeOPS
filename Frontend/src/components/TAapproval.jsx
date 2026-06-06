import '../css/TAapproval.css'
import Button from '@mui/material/Button';
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function TAapproval(){
    const {examId,studentId} = useParams();
    const [data,setData] = useState({});
    const questions = Object.values(data?.results || {});
    const [results,setResults] = useState({})
    const [currAns,setCurrAns] = useState(1);
    const key = `Q${currAns}`;
    const navigate = useNavigate();
    console.log(studentId);
    const handleMarksChange = (e)=>{

    setResults({
        ...results,

        [key]: {
            ...results[key],

            marks: e.target.value
        }
    })
}
    
    
    useEffect(()=>{
        const fetchdata = async()=>{
        const response = await axios.get(`http://localhost:5000/api/${examId}/student/${studentId}/getDetails`)
        setData(response.data);
        setResults(response.data.results);
    
    }
    fetchdata();
    },[])
    const handlePreviousClick = ()=>{
        setCurrAns(currAns-1);
    }
    const handleNextClick = ()=>{
        setCurrAns(currAns+1);
    }
    const handleEditClick = ()=>{
        setIsEditing(!isEditing);
    }
    const handleApproveClick = async ()=>{
          try {
            await axios.put(`http://localhost:5000/api/${examId}/student/${studentId}/updateResults`,results);
            console.log("saved successfully");
          }catch(e){
            console.log(e);
          }
          navigate(`/TA/exam/${examId}`);
    }
   
    return(
        <>
           <div className="taApproval">
            <h3>Student Evaluation Details</h3>
            <p>Roll number of the student :  {data.rollNo}</p>
            <p>Marks : {data.totalMarksByLLM}</p>

            <hr></hr>

            
                <p>Question:{currAns}</p>
                <p>Marks:<input className="editMarks" value={results[key]?.marks} onChange={handleMarksChange}></input>/{5}</p>
                <h4>Reason:{questions[currAns-1]?.reason}</h4>
            
            <Button variant="contained" onClick={handlePreviousClick} disabled={currAns===1}>Previous</Button>
            <Button variant="contained" onClick={handleApproveClick} disabled={currAns<Object.keys(results).length}>Approve</Button>
            <Button variant="contained" onClick={handleNextClick} disabled={currAns === Object.keys(results).length}>Next</Button>
           </div>
        </>

    )
}