import PDFviewer from '../components/Pdfviewer'
import Navbar from '../components/Navbar'
import Marksdetails from '../components/Marksdetails'
import MarksTable from '../components/Marksdetails'
import "../css/Approvepaper.css"
import TAapproval from '../components/TAapproval'
export default function Approvepaper(){
    const studentId = 123;
    return(
        <>
            <Navbar></Navbar>
            <div className="approvePaperBody">
                <PDFviewer></PDFviewer>
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