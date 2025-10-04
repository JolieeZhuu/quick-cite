import { useNavigate } from "react-router-dom"

export default function MediumList() {
    const navigate = useNavigate();

    function navigateToMediumPage(type: string) {
        navigate("/medium", { state: { type } });
    }

    return (
        <div>
            <p className="italic text-gray-600 mb-2">Available media:</p>
            <div className="flex flex-col gap-3">
                <button
                    className="px-4 py-2 rounded bg-violet-100 text-violet-800 font-medium hover:bg-violet-200 transition"
                    onClick={() => navigateToMediumPage("Basic Book")}
                >
                    Basic Book
                </button>
                {/* Add more media types as needed */}
            </div>
        </div>
    )
};