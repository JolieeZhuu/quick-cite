import { useNavigate } from "react-router-dom"

export default function EndPage() {

    const navigate = useNavigate();

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

            <button onClick={navigateToHomePage}>
                Back to Home Page
            </button>
            
        </div>
    )
};
