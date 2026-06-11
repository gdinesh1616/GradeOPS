import axios from "axios";
import { toast } from "react-toastify"
import { useEffect, useState} from "react";
import { BrowserRouter,Routes,Route,useNavigate,useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import '../css/TAapproval.css'
export default function TAapproval(){

    const {examId,studentId} = useParams();
    const [data,setData] = useState({});
    const questions = Object.values(data?.results || {});
    const [results,setResults] = useState({})
    const [currAns,setCurrAns] = useState(1);
    const [maxMarks,setMaxMarks] = useState("");
    const key = `Q${currAns}`;
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const response = await axios.get(`http://localhost:5000/api/${examId}/student/${studentId}/getDetails`)
                setData(response.data);
                setResults(response.data.results);
            }catch(e){
                toast.error(e.message);
            }
            
        }
    fetchdata();
    },[])

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:5000/api/${examId}/getQuestions`);
                setMaxMarks(response.data.questions);
            }catch(e){
                toast.error(e.message);
            }
            
        }
        fetchData();
    },[])

    const handleMarksChange = (e)=>{
        const enteredMarks = Number(e.target.value);
        if(enteredMarks>maxMarks[currAns-1].maxMarks){
             toast.error(`Marks cannot exceed ${maxMarks[currAns-1].maxMarks}`);
             return;
        }
        if(enteredMarks<0){
            toast.error("Marks cannot be negative");
            return;
        }
        setResults({
            ...results,
            [key]: {
                ...results[key],
                marks: e.target.value
            }
        })
    }
    
    
    const handlePreviousClick = ()=>{
        if(results[key].marks === ''){
            toast.error("Marks cannot be empty");
            return
        }
        setCurrAns(currAns-1);
    }

    const handleNextClick = ()=>{
        if(results[key].marks === ''){
            toast.error("Marks cannot be empty");
            return
        }
        setCurrAns(currAns+1);
    }

    const handleEditClick = ()=>{
        setIsEditing(!isEditing);
    }

    const handleApproveClick = async ()=>{
        if(results[key].marks === ''){
            toast.error("Marks cannot be empty");
            return
        }
          try {
            await axios.put(`http://localhost:5000/api/${examId}/student/${studentId}/updateResults`,results);
            toast.success("Approved Successfully");
          }catch(e){
            toast.error(e.message);
          }finally{
            navigate(`/TA/exam/${examId}`);
          }
         
    }
   
    return(
        <>
           <div className="taApproval">
                <h3>Student Evaluation Details</h3>
                <p>Roll number of the student :  {data.rollNo}</p>
                <p>Marks : {data.totalMarksByTA?data.totalMarksByTA:data.totalMarksByLLM}</p>
                <hr></hr>
                <p>Question:{currAns}</p>
                <p>Marks:<input className="editMarks" value={results[key]?.marks} onChange={handleMarksChange}></input>/{maxMarks[currAns-1]?.maxMarks}</p>
                <h4>Reason:{questions[currAns-1]?.reason}</h4>

                <div className="btns">
                    <Button variant="contained" onClick={handlePreviousClick} disabled={currAns===1}>Previous</Button>
                    <Button variant="contained" onClick={handleApproveClick} disabled={currAns<Object.keys(results).length}>Approve</Button>
                    <Button variant="contained" onClick={handleNextClick} disabled={currAns === Object.keys(results).length}>Next</Button>
                </div>

           </div>
        </>

    )
}