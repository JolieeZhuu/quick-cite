import MediumList from "../components/MediumList"

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
            <header className="bg-violet-400 px-6 py-4 rounded-b-lg shadow">
                <h1 className="text-2xl font-bold text-white tracking-wide">Quick Cite</h1>
            </header>
            <main className="max-w-md mx-auto mt-8 p-4 space-y-6 bg-white rounded-lg shadow">
                <p className="text-lg text-gray-700">Select a medium to cite</p>
                <MediumList />
            </main>
        </div>
    )
};