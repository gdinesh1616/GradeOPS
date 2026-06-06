import React, { useState } from 'react';
import '../css/Uploadqpform.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";


const QuestionFormTA = () => {
  const navigate = useNavigate();
  const {examId} = useParams();
  
  const [questions, setQuestions] = useState([
    { questionText: '', maxMarks: '', rubrics: '' }
  ]);
  const [isEditMode,setIsEditMode] = useState(false);

  
useEffect(()=>{

const fetchQuestions = async()=>{
   const res = await axios.get(`http://localhost:5000/api/${examId}/getQuestions`);
   console.log(res.data.questions);
   if(res.data.questions){
      setQuestions(
         Object.values(res.data.questions)
      );
      setIsEditMode(true);
   }
   else{
      setQuestions([
         {
            questionText:"",
            maxMarks:"",
            rubrics:""
         }
      ]);
   }
}

fetchQuestions();

},[])
  


 


  return (
    <div className="container">
      <form className="form-card" >
        <h2 className="form-title">Questionnaire Builder</h2>
        
        {questions.map((q, index) => (
          <div key={index} className="question-section">
            <div className="section-header">
              <h3>Question {index + 1}</h3>
            </div>

            <div className="input-group">
              <label>Question Text</label>
              <input
                type="text"
                name="questionText"
                placeholder="e.g. Define Kirchhoff's Law"
                value={q.questionText}
              />
            </div>

            <div className="row">
              <div className="input-group">
                <label>Max Marks</label>
                <input
                  type="number"
                  name="maxMarks"
                  placeholder="10"
                  value={q.maxMarks}
                />
              </div>
              <div className="input-group">
                <label>Rubrics</label>
                <textarea
                  name="rubrics"
                  placeholder="Enter grading criteria..."
                  value={q.rubrics}
                />
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuestionFormTA;