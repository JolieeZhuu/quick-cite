import { useNavigate, useLocation } from "react-router-dom"

import { useEffect } from "react";

export default function EndPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const apaData = location.state.apa;
    const apaCitation = <p>
        {apaData.author} ({apaData.year}). <i>{apaData.title}.</i> {apaData.publisher}.
    </p>

    function navigateToHomePage() {
        navigate(
            "/"
        )
    }

    return (
        <div className="min-w-screen space-y-5">
            <div className="bg-gray-500 p-4">
                <h1>Quick Cite</h1>
            </div>
            
            <h1>Citation Complete!</h1>
            <div>
                {apaCitation}
            </div>

            <button onClick={navigateToHomePage}>
                Back to Home Page
            </button>
            
        </div>
    )
};
