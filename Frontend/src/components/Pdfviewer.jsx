import { useState, useRef,useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Button from '@mui/material/Button';
import api from "../api";
import { toast } from "react-toastify";
import "../css/Pdfviewer.css"



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();


function PDFViewer(prop) {

    const[data,setData] = useState();
    const pdfUrl = data?.answerScriptURL;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=>{
          const fetchdata = async()=>{
            try{
              const response = await api.get(`/api/${prop.examId}/student/${prop.studentId}/getDetails`)
              setData(response.data);
            }catch(e){
              toast.error(e.message);
            }
          
      }
    fetchdata();
    })

    const onLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
    
    const pageRight = useRef(null);
    const pageLeft = useRef(null);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
          pageRight.current.click();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    
    useEffect(() => {
      const handleKeyDown = (e) => {

        if (e.key === "ArrowLeft") {
          pageLeft.current.click(); 
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
        <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className='image'
            height={600}
        />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Button ref={pageLeft}
        onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
      >
        Prev
      </Button>
      <Button ref={pageRight}
        onClick={() =>
          setPageNumber((p) => Math.min(p + 1, numPages))
        }
      >
        Next
      </Button>
    </div>
  );
}

export default PDFViewer;