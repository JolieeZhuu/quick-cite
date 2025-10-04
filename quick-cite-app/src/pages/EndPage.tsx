import { useLocation, useNavigate } from "react-router-dom";

export default function EndPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const apa = location.state?.apa;

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
                    ← Go Home
                </button>
                <p className="text-lg font-semibold text-gray-800">Your Citation</p>
                <div className="border rounded p-3 bg-gray-50 text-gray-700">
                    {apa
                        ? (
                            <span>
                                {apa.author} ({apa.year}). <i>{apa.title}</i>. {apa.publisher}.
                            </span>
                        )
                        : <span>No citation data available.</span>
                    }
                </div>
            </main>
        </div>
    )
}