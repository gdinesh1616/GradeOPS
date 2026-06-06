import React, { useState } from 'react';
import '../css/Uploadqpform.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const QuestionForm = () => {
  const navigate = useNavigate();
  const {examId} = useParams();
  
  const [questions, setQuestions] = useState([
    { questionText: '', maxMarks: '', rubrics: '' }
  ]);

  const handleInputChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', maxMarks: '', rubrics: '' }]);
  };

  const removeQuestion = (index) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postRubrics = await axios.post(`http://localhost:5000/api/${examId}/postRubrics`,{questions})
    console.log("hi");
    navigate(`/Instructor/exam/${examId}`)
  };

  return (
    <div className="container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Questionnaire Builder</h2>
        
        {questions.map((q, index) => (
          <div key={index} className="question-section">
            <div className="section-header">
              <h3>Question {index + 1}</h3>
              {questions.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeQuestion(index)}>
                  Remove
                </button>
              )}
            </div>

            <div className="input-group">
              <label>Question Text</label>
              <input
                type="text"
                name="questionText"
                placeholder="e.g. Define Kirchhoff's Law"
                value={q.questionText}
                onChange={(e) => handleInputChange(index, e)}
                required
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
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Rubrics</label>
                <textarea
                  name="rubrics"
                  placeholder="Enter grading criteria..."
                  value={q.rubrics}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="action-buttons">
          <button type="button" className="add-btn" onClick={addQuestion}>
            + Add Question
          </button>
          <button type="submit" className="submit-btn">
            Submit Paper
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;