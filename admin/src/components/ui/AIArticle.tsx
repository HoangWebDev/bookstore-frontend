import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePost from "~/hooks/usePost";
import Loading from "./Loading";

type FormValues = {
    title: string;
    keywords: string;
    desiredLength: number;
};

type AIArticleProps = {
    handleShowAI: () => void;
    onContentGenerated: (content: string) => void; // 👈 thêm prop này
};

function AIArticle({ handleShowAI, onContentGenerated }: AIArticleProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = usePost();

    const onSubmit = (data: FormValues) => {

        const formData = {
            title: data.title?.trim() || null, // ✅ khớp với BE            
            keywords: data.keywords?.trim() || null,
            desiredLength: data.desiredLength,
            hasImage: true
        };

        setIsLoading(true);
        try {
            mutate({
                url: "/AiWriter/generate",
                data: formData
            }, {
                onSuccess: async (response) => {
                    const content = response.data?.content;
                    if (content) {
                        toast.success("Generate successful!");
                        onContentGenerated(content); // 👈 Gửi content về parent
                        handleShowAI(); // đóng popup sau khi generate xong
                    }

                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    };

    const handleStopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngăn click vào form đóng modal
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-[rgba(107,114,128,0.7)] z-50 flex items-center justify-center"
                onClick={handleShowAI}
            >
                <form
                    onClick={handleStopPropagation}
                    // onSubmit={handleSubmit(onSubmit)}
                    className="w-[90%] max-w-lg bg-white p-6 rounded-2xl shadow-lg"
                >
                    <h1 className="text-xl font-bold mb-4">AI Article</h1>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Keywords
                        </label>
                        <input
                            type="text"
                            {...register("keywords", { required: true })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        {errors.keywords && <p className="text-red-500 text-sm">Keywords are required</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Desired Length
                        </label>
                        <input
                            type="number"
                            {...register("desiredLength", { required: true, min: 100 })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        {errors.desiredLength && <p className="text-red-500 text-sm">Length must be at least 100</p>}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Generate
                        </button>
                    </div>
                </form>
            </div>
            {isLoading && <Loading />}
        </>

    );
}

export default AIArticle;
