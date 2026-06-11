import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from '@mui/material/CssBaseline';
import DashboardTA from './pages/ta/Dashboard';
import Login from './pages/auth/Login';
import Instructorexam from './pages/instructor/Dashboard';
import Newexamform from './pages/instructor/CreateExam';
import ViewstudentI from './pages/instructor/EvaluationDashboard';
import Addstudent from './pages/instructor/Addstudent';
import Uploadqp from './pages/instructor/UploadRubrics';
import ViewstudentTA from './pages/ta/ExamDashboard';
import Approvepaper from './pages/ta/ApprovalPage';
import QuestionFormTA from './pages/ta/Rubrics';
import './css/index.css'
import './css/App.css'

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
       
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Instructor" element={<Instructorexam/>}></Route>
          <Route path="Instructor/exam/:examId" element={<ViewstudentI />} />
          <Route path="/TA" element={<DashboardTA/>}>  </Route>
          <Route path="/TA/exam/:examId" element={<ViewstudentTA/>}/>
          <Route path="/newexam" element={<Newexamform/>}></Route>
          <Route path="/Instructor/:examId/addStudentForm" element={<Addstudent/>}></Route>
          <Route path="/Instructor/:examId/Uploadqp" element={<Uploadqp/>}></Route>
          <Route path="/TA/:examId/student/:studentId/approve" element={<Approvepaper/>}></Route>
          <Route path="/TA/:examId/viewRubrics" element={<QuestionFormTA/>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

  

