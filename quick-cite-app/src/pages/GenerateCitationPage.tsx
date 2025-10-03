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

        const fields = "&fields=key,title,author_name,isbn,publisher,publish_year"
        fetch(url + values.title + fields, options)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                const docs = data.docs.slice(0, 10);
                
                console.log(docs);
                const docsDisplay = docs.map((element: any, index: number) => {
                    return (
                        <div key={index} className="bg-gray-900 hover:bg-gray-700 mb-2" onClick={() => handleOnClick(docs[index])}>
                            <p>Title: {element.title}</p>
                            <p>Author: {element.author_name}</p>
                            <p>Published year: {element.publish_year[0]}</p>
                            <p>Publisher: {element.publisher[0]}</p>
                            <p>ISBN: {element.isbn[0]}</p>
                        </div>
                    )
                });
                setBookList(docsDisplay)
            }
            )
            .catch(error => (console.error('Error:', error)))
    }

    function handleOnClick(data: any) {
        console.log(data)
        const fullAuthorName = data.author_name[0].split(" ")
        let authorName = ""

        if (fullAuthorName.length > 2) {
            authorName += `${fullAuthorName[fullAuthorName.length - 1]}, ${fullAuthorName[0][0]}. ${fullAuthorName[1][0]}.`
        } else {
            authorName += `${fullAuthorName[fullAuthorName.length - 1]}, ${fullAuthorName[0][0]}.`
        }

        navigate(
            "/end", {
                state: {
                    apa: {
                        author: authorName,
                        year: data.publish_year[0],
                        title: data.title,
                        publisher: data.publisher[0]
                    }
                }
            }
        )

        /*
        Author, A. A. (Year of publication). Title of work: Capital letter also for subtitle. Publisher Name. DOI (if available)
        */
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
                <button onClick={navigateToMediumPage}>
                    Go Back
                </button>
            </div>
        </div>
    )
};
