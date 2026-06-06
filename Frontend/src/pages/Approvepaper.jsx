import PDFviewer from '../components/Pdfviewer'
import Navbar from '../components/Navbar'
import Marksdetails from '../components/Marksdetails'
import MarksTable from '../components/Marksdetails'
import "../css/Approvepaper.css"
import TAapproval from '../components/TAapproval'
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Approvepaper(){
    const {studentId,examId} = useParams();

    return(
        <>
            <Navbar></Navbar>
            <div className="approvePaperBody">
                <PDFviewer studentId={studentId} examId={examId}></PDFviewer>
                <div style={{
                    width: "1px",
                    height: "100vh",
                    backgroundColor: "grey"
                }} />
                <TAapproval studentId={studentId}></TAapproval>

            </div>
           
            </>
    )
}