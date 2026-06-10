import axios from "axios";
import { useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import PDFviewer from '../../components/Pdfviewer'
import Navbar from '../../components/Navbar'
import TAapproval from '../../components/TAapprovalDiv'
import '../../css/App.css'
import "../../css/Approvepaper.css"


export default function Approvepaper(){

    const {studentId,examId} = useParams();

    return(
        <>
            <Navbar></Navbar>
            <div className="approvePaperBody page">
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