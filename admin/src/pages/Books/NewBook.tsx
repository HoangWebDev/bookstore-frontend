import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Form from "~/components/ui/Form";
import useFieldBook from "~/constants/bookFields";
import usePost from "~/hooks/usePost";
import BookModel from "~/models/BookModel";

function NewBook() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = usePost();
    const { bookFields } = useFieldBook()

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (data: BookModel) => {
        console.log(data);

        const formData = new FormData();

        formData.append("slug", data.slug);
        formData.append("bookName", data.bookName);
        formData.append("price", data.price.toString());
        formData.append("discountPercent", data.discountPercent.toString());
        formData.append("categoryId", data.categoryId.toString());
        formData.append("authorId", data.authorId.toString());
        formData.append("publisherId", data.publisherId.toString());
        formData.append("description", data.description);
        formData.append("publishYear", data.publishYear.toString());
        formData.append("pageCount", data.pageCount.toString());
        formData.append("weight", data.weight.toString());
        formData.append("size", data.size);
        formData.append("coverType", data.coverType);

        // Kiểm tra xem data.image có phải là file mới hay không
        if (data.image && typeof data.image !== "string" && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        setIsLoading(true);

        try {
            mutate({
                url: "/book/new_book",
                data: formData
            }, {
                onSuccess: () => {
                    toast.success("Add successful book");
                    // Invalidate query để đảm bảo data mới nhất
                    queryClient.invalidateQueries({ queryKey: ["/book/all_books"] });
                    navigate("/book");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            })
        } catch (error) {
            toast.error("System error");
            setIsLoading(false);
        }
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-gray-800">New Book</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            New Book
                        </li>
                    </ol>
                </nav>
            </div>
            <Form fields={bookFields} onSubmit={handleSubmit} isLoading={isLoading} />
        </section>
    );
}

export default NewBook;