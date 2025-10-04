import { useLocation, useNavigate } from "react-router-dom";
import { BASIC_BOOK } from "../components/files/citation-format";

export default function MediumPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const medium = location.state.type;

    function navigateToGenerateCitationPage() {
        navigate("/generate", { state: { type: medium } });
    }

    function navigateToManualCitationPage() {
        navigate("/manual", { state: { type: medium } });
    }

    function goBack() {
        navigate("/");
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
            <header className="bg-violet-400 px-6 py-4 rounded-b-lg shadow">
                <h1 className="text-2xl font-bold text-white tracking-wide">Quick Cite</h1>
            </header>
            <main className="max-w-md mx-auto mt-8 p-4 space-y-6 bg-white rounded-lg shadow">
                <button
                    onClick={goBack}
                    className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 mb-2"
                >
                    ← Go Back
                </button>
                <p className="text-lg font-semibold text-gray-800">{medium}</p>
                <div className="border rounded p-3 bg-gray-50 text-sm text-gray-700">
                    {BASIC_BOOK}
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={navigateToGenerateCitationPage}
                        className="px-4 py-2 rounded bg-violet-800 text-white font-medium hover:bg-violet-400 transition"
                    >
                        Generate citation
                    </button>
                    <button
                        onClick={navigateToManualCitationPage}
                        className="px-4 py-2 rounded bg-violet-800 text-white font-medium hover:bg-violet-400 transition"
                    >
                        Manually cite
                    </button>
                </div>
            </main>
        </div>
    )
};