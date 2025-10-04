import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const manualSchema = z.object({
    author_fn: z.string().min(1, {
        message: "Enter a valid first name",
    }),
    author_ln: z.string().min(1, {
        message: "Enter a valid last name",
    }),
    publish_year: z.string().regex(/^\d{4}$/, { 
        message: "Enter a valid 4-digit year" 
    }),
    title: z.string().min(2, {
        message: "Enter a valid book title",
    }),
    publisher: z.string().min(1, {
        message: "Enter a valid publisher"
    })
})

export default function ManualCitationPage() {
    const navigate = useNavigate();

    function navigateToMediumPage() {
        navigate("/medium", {
            state: { type: "Basic Book" }
        });
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<z.infer<typeof manualSchema>>({
        resolver: zodResolver(manualSchema),
        defaultValues: { 
            author_fn: "",
            author_ln: "",
            publish_year: "",
            title: "",
            publisher: ""
        },
    })

    function onSubmit(values: z.infer<typeof manualSchema>) {
        navigate("/end", {
            state: {
                apa: {
                    author: values.author_ln + ", " + values.author_fn[0] + ".",
                    year: values.publish_year,
                    title: values.title,
                    publisher: values.publisher
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
                <p className="text-lg font-semibold text-gray-800">Manually Cite</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-800 mb-1">Author First Name <span className="text-red-500">*</span></label>
                        <input
                            {...register("author_fn")}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                            type="text"
                            placeholder="Ex: Margaret"
                        />
                        {errors.author_fn && (
                            <span className="text-red-500 text-sm">{errors.author_fn.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-800 mb-1">Author Last Name <span className="text-red-500">*</span></label>
                        <input
                            {...register("author_ln")}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                            type="text"
                            placeholder="Ex: Atwood"
                        />
                        {errors.author_ln && (
                            <span className="text-red-500 text-sm">{errors.author_ln.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-800 mb-1">Published Year <span className="text-red-500">*</span></label>
                        <input
                            {...register("publish_year")}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                            type="text"
                            placeholder="Ex: 2005"
                        />
                        {errors.publish_year && (
                            <span className="text-red-500 text-sm">{errors.publish_year.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-800 mb-1">Book Title <span className="text-red-500">*</span></label>
                        <input
                            {...register("title")}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                            type="text"
                            placeholder="Ex: The Penelopiad"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-sm">{errors.title.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-800 mb-1">Publisher <span className="text-red-500">*</span></label>
                        <input
                            {...register("publisher")}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-600"
                            type="text"
                            placeholder="Ex: Canongate Books"
                        />
                        {errors.publisher && (
                            <span className="text-red-500 text-sm">{errors.publisher.message}</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 rounded bg-violet-500 text-white font-medium hover:bg-violet-600 transition"
                    >
                        Cite
                    </button>
                </form>
            </main>
        </div>
    )
};