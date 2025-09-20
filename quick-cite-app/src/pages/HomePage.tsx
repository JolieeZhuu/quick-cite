import MediumList from "../components/MediumList"

export default function HomePage() {
    return (
        <div className="min-w-screen space-y-5">
            <div className="bg-gray-500 p-4">
                <h1>Quick Cite</h1>
            </div>
            <div>
                <p>Select a medium to cite</p>
            </div>
            <MediumList/>
        </div>
    )
};
