import { useNavigate } from "react-router-dom"

export default function ManualCitationPage() {

    const navigate = useNavigate();

    function navigateToEndPage() {
        navigate(
            "/end"
        )
    }

    function navigateToMediumPage() {
        navigate(
            "/medium", {
                state: {
                    type: "Basic Book"
                }
            }
        )
    }

    return (
        <div className="min-w-screen space-y-5">
            <div className="bg-gray-500 p-4">
                <h1>Quick Cite</h1>
            </div>

            <h1>Manually Cite</h1>
            <div className="flex flex-col gap-5">
                <button onClick={navigateToEndPage}>
                    Cite
                </button>
                <button onClick={navigateToMediumPage}>
                    Go Back
                </button>
            </div>
        </div>
    )
};
