// interface MediumPageProps {
//     medium: string,
// }

import { useLocation, useNavigate } from "react-router-dom";
import { BASIC_BOOK } from "../components/files/citation-format";

export default function MediumPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const medium = location.state.type;

    function navigateToGenerateCitationPage() {
        navigate(
            "/generate", {
                state: {
                    type: medium
                }
            }
        )
    }

    function navigateToManualCitationPage() {
        navigate(
            "/manual", {
                state: {
                    type: medium
                }
            }
        )
    }

    function goBack() {
        navigate(
            "/"
        )
    }

    return (
        <div className="min-w-screen space-y-5">
            <div className="bg-gray-500 p-4">
                <h1>Quick Cite</h1>
            </div>

            <p>{medium}</p>
            {/* Example (hardcoded) */}
            <div className="border">
                {BASIC_BOOK}
            </div>

            <div className="flex flex-col gap-5">
                {/* Example (hardcoded) */}
                <button onClick={() => navigateToGenerateCitationPage()}>
                    Generate citation
                </button>
                <button onClick={() => navigateToManualCitationPage()}>
                    Manually cite
                </button>
                <button onClick={goBack}>
                    Go Back
                </button>
            </div>
        </div>
    )
};
