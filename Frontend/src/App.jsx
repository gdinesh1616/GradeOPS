import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardTA from './pages/dashboardTA';
import Login from './pages/Login';
import Instructorexam from './pages/Instuctorexam';
import Newexamform from './pages/Newexamform';
import ViewstudentI from './pages/ViewstudentI';
import Addstudent from './pages/Addstudent';
import Uploadqp from './pages/Uploadqp';
import ViewstudentTA from './pages/ViewstudentTA';
import Approvepaper from './pages/Approvepaper';
import MarksTable from './components/Marksdetails';
import './css/index.css'

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
       
      <BrowserRouter>
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
        </Routes>
     
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

  

