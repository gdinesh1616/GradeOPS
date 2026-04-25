import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'

export default function Login(){
    const navigate = useNavigate()
    const navigateToInsPage = ()=>{
            navigate('/Instructor')
        }
        const navigateToTAPage = ()=>{
            navigate('/TA')
        }
    return(
        <>
        <div className="login">
            <div className="webName">GradeOPS<br></br></div>
            
            <div>
                <p>Evaluate your Answer Scripts</p>
                <h1>LOGIN</h1>
                <button onClick={navigateToInsPage} className='loginbtns'>INSTRUCTOR</button>
                <button onClick={navigateToTAPage} className='loginbtns'>TEACHING ASSISTANT</button>
            </div>

        </div>
        </>
    )
}