import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../css/Uploadqpform.css'
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";

export default function Uploadqp(){
    const navigate = useNavigate();
    const {examId} = useParams();
    console.log(examId);

    const [qp, setQp] = useState(null);

  const handleQp = (e) => {
     console.log(e.target.files[0]);
    setQp(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("qp", qp);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/exam/${examId}/qpUpload`, // replace with examId
        data
      );

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    
  }

    return(
    <div className='uploadqpform'>
        <form onSubmit={handleSubmit}>
            <div className='field'>
                <h2>Upload</h2>
            </div>
            <div className='field'>
                <label htmlFor='pdfqp'>Question Paper</label>
                <input type="file" id="pdfqp" name="qp" onChange={handleQp}></input>
            </div>
            <div className='field'>
                {/* <label htmlFor="rubrics">Answer</label> */}
            {/* <input type="file" id="rubrics" name="ap"></input> */}
            </div>
            <div className="field">
                <Button variant="contained" type="submit">Submit</Button>
            </div>
        </form>
    </div>
    )
}