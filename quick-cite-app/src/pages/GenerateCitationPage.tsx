import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const url = "https://openlibrary.org/search.json?q=";
const headers = new Headers({
    'User-Agent': 'QuickCite/1.0 (zhujolie973@gmail.com)'
});
const options = {
    method: 'GET',
    headers: headers
};

const searchSchema = z.object({
    title: z.string().min(2, {
        message: "Book title is required",
    })
})

export default function GenerateCitationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const medium = location.state.type;
    const [bookList, setBookList] = useState<React.ReactElement[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [nothing, setNothing] = useState<boolean>(false)

    function navigateToMediumPage() {
        navigate("/medium", { state: { type: "Basic Book" } })
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: { title: "" },
    })

    function onSearchSubmit(values: z.infer<typeof searchSchema>) {
        setLoading(true)
        setNothing(false)
        const fields = "&fields=key,title,author_name,isbn,publisher,publish_year"
        fetch(url + values.title + fields, options)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if (!Array.isArray(data.docs) || !data.docs.length) {
                    setNothing(true)
                } else {
                    const docs = data.docs.slice(0, 10);
                    const docsDisplay = docs.map((element: any, index: number) => (
                        <div
                            key={index}
                            className="bg-violet-50 hover:bg-violet-100 border rounded p-3 mb-2 cursor-pointer transition"
                            onClick={() => handleOnClick(element)}
                        >
                            <p className="font-semibold text-gray-700">{element.title}</p>
                            <p className="text-sm text-gray-700">Author: {element.author_name?.join(", ")}</p>
                            <p className="text-sm text-gray-700">Published: {element.publish_year?.[0]}</p>
                            <p className="text-sm text-gray-700">Publisher: {element.publisher?.[0]}</p>
                            <p className="text-sm text-gray-700">ISBN: {element.isbn?.[0]}</p>
                        </div>
                    ));
                    setBookList(docsDisplay)
                }
            })
            .catch(error => (console.error('Error:', error)))
    }

    function handleOnClick(data: any) {
        const fullAuthorName = data.author_name?.[0]?.split(" ") || []
        let authorName = ""
        if (fullAuthorName.length > 2) {
            authorName += `${fullAuthorName[fullAuthorName.length - 1]}, ${fullAuthorName[0][0]}. ${fullAuthorName[1][0]}.`
        } else if (fullAuthorName.length > 1) {
            authorName += `${fullAuthorName[fullAuthorName.length - 1]}, ${fullAuthorName[0][0]}.`
        } else {
            authorName += data.author_name?.[0] || ""
        }
        navigate("/end", {
            state: {
                apa: {
                    author: authorName,
                    year: data.publish_year?.[0],
                    title: data.title,
                    publisher: data.publisher?.[0]
                }
            }
        })
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
            <header className="bg-violet-400 px-6 py-4 rounded-b-lg shadow">
                <h1 className="text-2xl font-bold text-white tracking-wide">Quick Cite</h1>
            </header>
            <main className="max-w-md mx-auto mt-8 p-4 space-y-6 bg-white rounded-lg shadow">
                <button
                    onClick={navigateToMediumPage}
                    className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 mb-2"
                >
                    ← Go Back
                </button>
                <p className="text-lg font-semibold text-gray-800">Generate Citation</p>
                <p className="italic text-gray-600">{medium}</p>
                <form onSubmit={handleSubmit(onSearchSubmit)} className="flex flex-col gap-2">
                    <label className="text-base text-gray-600">Enter a book title:</label>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                        <input
                            {...register("title")}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600 w-full sm:w-auto"
                            type="text"
                            placeholder="Search for a book title..."
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-violet-500 text-white font-medium hover:bg-violet-600 transition"
                        >
                            Search
                        </button>
                    </div>
                    {errors.title && (
                        <div className="text-red-500 text-sm">{errors.title.message}</div>
                    )}
                </form>
                {loading && <p className="text-gray-500">Loading...</p>}
                {nothing && <p className="text-gray-500">Nothing available.</p>}
                {/* Scrollable book list area */}
                <div className="max-h-64 overflow-y-auto space-y-2">
                    {bookList}
                </div>
            </main>
        </div>
    )
};