import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import '../../css/Login.css'

export default function Login () {

    const navigate = useNavigate();

    const navigateToInsPage = ()=>{
        navigate('/Instructor');
    }
    
    const navigateToTAPage = ()=>{
        navigate('/TA');
    }

    return(
        <>
            <div className="role-page">
                <div className="role-card">
                    <h1 className="title">GradeOPS</h1>
                    <p className="subtitle">AI Based Evaluation Platform</p>
                    <div className="role-options">
                        <div className="role-box">
                            <span>👨‍🏫</span>
                            <h2>Instructor</h2>
                            <button onClick={navigateToInsPage}>
                                Continue
                            </button>
                        </div>
                        <div className="role-box">
                            <span>🧑‍💻</span>
                            <h2>Teaching Assistant</h2>
                            <button onClick={navigateToTAPage}>
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
