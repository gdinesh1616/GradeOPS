import '../css/Examcard.css'
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
export default function Examcard(prop){
   const coursename = prop.details.courseName;
   const conductedon = prop.details.conductedOn;
   const students = prop.details.numStudents;
   const statusofevaluation = prop.details.status;
const navigate = useNavigate();
const handleClick = ()=>{
    navigate(`/${prop.person}/exam/${prop.details._id}`);
}

    return(
        <>
            <div className="Examcard">
                <div>
                    <h3>{coursename}</h3>
                    <p>Status:{statusofevaluation}</p>
                    <p>Conducted On:{conductedon}</p>
                    <p>Number of students:{students}</p>
                </div>
                <div className="buttondiv">
                    <Button className="viewExam" variant="contained" onClick={handleClick}>View</Button>
                </div>
                
            </div>
        </>

    )
}