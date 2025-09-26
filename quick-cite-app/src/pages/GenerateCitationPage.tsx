import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" // Used for input validation

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

    // Define form
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: "",
        },
    })

    // Define search submit handler
    function onSearchSubmit(values: z.infer<typeof searchSchema>) {
        console.log(values)
        setLoading(true)

        fetch(url + values.title, options)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                const docs = data.docs.slice(0, 10);
                console.log(docs);
                const docsDisplay = docs.map((element: any, index: number) => {
                    return (
                        <div key={index} className="bg-gray-900 hover:bg-gray-700 mb-2">
                            <p>Title: {element.title}</p>
                            <p>Author: {element.author_name}</p>
                            <p>Published year: {element.first_publish_year}</p>
                        </div>
                    )
                });
                setBookList(docsDisplay)
            }
            )
            .catch(error => (console.error('Error:', error)))
    }

    return (
        <div className="min-w-screen space-y-5">
            <div className="bg-gray-500 p-4">
                <h1>Quick Cite</h1>
            </div>
            <p>Generate Citation</p>
            <p>{medium}</p>
            <div>
                <form onSubmit={handleSubmit(onSearchSubmit)}>
                    <label className="mr-3">Enter book title:</label>
                    <input {...register("title")} className="border" type="text" placeholder="Search for a book title..." />
                    { errors.title && (
                        <div className="text-red-500">{ errors.title.message }</div>
                    )}
                </form>
            </div>
            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    bookList
                )
            }
            <div className="flex flex-col gap-5">
                <button onClick={navigateToEndPage}>
                    Generate
                </button>
                <button onClick={navigateToMediumPage}>
                    Go Back
                </button>
            </div>
        </div>
    )
};
