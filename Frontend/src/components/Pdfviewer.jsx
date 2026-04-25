import { useState, useRef,useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../css/Pdfviewer.css"
import Button from '@mui/material/Button';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
// IMPORTANT: fix worker
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer() {
  const pdfUrl = "https://res.cloudinary.com/dzusarwvk/raw/upload/v1776440522/iwltt0dsmjgxhwfr0kyy.pdf"; // <-- YOUR PDF URL

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
const pageRight = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        pageRight.current.click(); // 👈 simulate click
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pageLeft = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        pageLeft.current.click(); // 👈 simulate click
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