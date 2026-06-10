import '../css/Examcard.css'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function Examcard(prop){

    const courseName = prop.details.courseName;
    const conductedOn = prop.details.conductedOn;
    const numStudents = prop.details.numStudents;
    const statusOfEvaluation = prop.details.status;
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/${prop.person}/exam/${prop.details._id}`);
    }

    return(
        <>
            <div className="examCard">
                <div>
                    <h3>{courseName}</h3>
                    <p>Status:{statusOfEvaluation}</p>
                    <p>Conducted On:{conductedOn}</p>
                    <p>Number of students:{numStudents}</p>
                </div>
                <div className="btn">
                    <Button className="viewExam" variant="contained" onClick={handleClick}>View</Button>
                </div>
            </div>
        </>
    )
}