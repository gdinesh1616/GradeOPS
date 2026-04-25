import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../css/Addstudent.css'
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Addstudent(){
    const navigate = useNavigate();
    const { examId } = useParams();

    const[formData,setFormData] = useState({
        rollNo:'',
        file:null,
        examId:examId,
    })
    const[selectedFile,setSelectedFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };
  const handleFile = (e) =>
    setFormData({
      ...formData,
      file: e.target.files[0]
    })
  


 

  const handleSubmit = async ()=>{

    const data = new FormData();
    data.append("file",formData.file);
    data.append("rollNo",formData.rollNo);
    data.append("examId",formData.examId);

    navigate(`Instructor/exam/${examId}`);
    try{
        console.log(data);
        const res = await axios.post(`http://localhost:5000/api/exam/${examId}/student`,data)
        
    }catch(e){
        console.log(e);
    }
    
  }
  


    return(
    <div className='addStudent'>
        <form >
            <div className='field'>
                <div className='formheader'>
                    <h2>Add student</h2>
                    <a href='/'><i class="fa-regular fa-circle-xmark"></i></a>
                </div>
                
            </div>
            <div className='field'>
                <label htmlFor='outlined-search'>Roll number of the student</label>
                <TextField id="outlined-basic" label="Roll number" variant="outlined" size='small' name='rollNo' onChange={handleChange} />
            </div>
            <div className='field'>
                <label htmlFor="pdfap" >Upload the answer script of the student</label>
            <input type="file" id="pdfap" name='file' onChange={handleFile}></input>
            </div>
            <div className="field">
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
            
        </form>
    </div>


    )
    

}