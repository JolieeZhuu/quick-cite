import { useNavigate } from "react-router-dom"

export default function MediumList() {

    const navigate = useNavigate();

    function navigateToMediumPage(type: string) {
        navigate(
            "/medium", {
                state: {
                    type: type
                }
            }
        )
    }

    return (
        <div>
            <p>Search for a medium</p>
            <p>A List :D</p>
            <div className="border">
                <button onClick={() => navigateToMediumPage("Basic Book")}>
                    Basic Book
                </button>
            </div>
        </div>
    )
};
