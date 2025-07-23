import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormEdit from "~/components/ui/FormEdit";
import useFieldBook from "~/constants/bookFields";
import useGet from "~/hooks/useGet";
import usePut from "~/hooks/usePut";
import BookModel from "~/models/BookModel";

function EditBook() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const bookId = Number(id);

    const [isLoading, setIsLoading] = useState(false);

    const { mutate: put } = usePut();
    const { data: book } = useGet<BookModel>(`/book/book/` + bookId);
    const { bookFields } = useFieldBook();


    const handleSubmit = (data: BookModel) => {
        const formData = new FormData();

        formData.append("slug", data.slug.toString());
        formData.append("bookId", bookId.toString());
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
            put({
                url: "/book/update_book",
                data: formData
            }, {
                onSuccess: (response) => {
                    console.log(response);
                    toast.success("Update successful book");
                    // Invalidate query để đảm bảo data mới nhất
                    queryClient.invalidateQueries({ queryKey: ["/book/all_books"] });
                    // Invalidate lại thông tin của sách hiện tại
                    queryClient.invalidateQueries({ queryKey: [`/book/book/${bookId}`] });
                    navigate("/book");
                },
                onError: (error) => {
                    console.log(error);
                },
                onSettled: () => {
                    setIsLoading(false); // Dừng loading bất kể thành công hay lỗi
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
                <h1 className="text-xl font-semibold text-gray-800">Edit Book</h1>
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link to={"/"} className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-800">
                                Home
                                <RiArrowRightSLine />
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800">
                            Edit Book
                        </li>
                    </ol>
                </nav>
            </div>
            <FormEdit fields={bookFields} onSubmit={handleSubmit} defaultValues={book} isLoading={isLoading} />
        </section>
    );
}

export default EditBook;